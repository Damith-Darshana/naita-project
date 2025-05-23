from django.db import models
from users.models import User

class CourseCategory(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)
    
    def __str__(self):
        return self.name

class TrainingCenter(models.Model):
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    address = models.TextField()
    contact_number = models.CharField(max_length=15)
    email = models.EmailField()
    google_map_link = models.URLField(blank=True)
    
    def __str__(self):
        return self.name

class Course(models.Model):
    DURATION_UNITS = (
        ('weeks', 'Weeks'),
        ('months', 'Months'),
        ('years', 'Years'),
    )
    
    # Basic Information
    title = models.CharField(max_length=200)
    code = models.CharField(max_length=20, unique=True)
    category = models.ForeignKey(CourseCategory, on_delete=models.SET_NULL, null=True)
    description = models.TextField()
    
    # Duration and Pricing
    duration = models.PositiveIntegerField()
    duration_unit = models.CharField(max_length=10, choices=DURATION_UNITS)
    fee = models.DecimalField(max_digits=10, decimal_places=2)
    registration_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Visual Elements
    thumbnail = models.ImageField(upload_to='course_thumbnails/', null=True, blank=True)
    background_image = models.ImageField(upload_to='course_backgrounds/', null=True, blank=True)
    
    # Course Details
    certification = models.CharField(max_length=100, blank=True)
    districts = models.JSONField(default=list, help_text="List of available districts for this course")
    features = models.JSONField(default=list, help_text="List of course features")
    
    # Course Content Structure
    content = models.JSONField(
        default=list,
        help_text="Structured content in format [{'title': 'Module 1', 'topics': ['Topic 1', 'Topic 2']}]"
    )
    
    # Requirements
    requirements = models.JSONField(default=list, help_text="List of entry qualifications")
    
    # Administrative
    syllabus = models.FileField(upload_to='course_syllabus/', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.code} - {self.title}"
    
    def get_duration_display(self):
        return f"{self.duration} {self.get_duration_unit_display()}"

class CourseOffering(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    center = models.ForeignKey(TrainingCenter, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    instructor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, limit_choices_to={'user_type': 2})
    schedule = models.CharField(max_length=200)  # e.g., "Mon, Wed, Fri 6-9 PM"
    available_seats = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)
    
    class Meta:
        unique_together = ('course', 'center', 'start_date', 'schedule')
    
    def __str__(self):
        return f"{self.course.title} at {self.center.name}"



class HeroContent(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    button_text = models.CharField(max_length=50, default="Register Now")
    background_image = models.ImageField(upload_to='hero_images/')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title  


# models.py
# courses/models.py


class Service(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon_name = models.CharField(max_length=50, blank=True)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.title

class DashboardStat(models.Model):
    active_learners = models.PositiveIntegerField(default=0)
    total_courses = models.PositiveIntegerField(default=0)
    proud_graduates = models.PositiveIntegerField(default=0)
    current_year = models.PositiveIntegerField()
    last_updated = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Dashboard Statistics"
        verbose_name_plural = "Dashboard Statistics"

    def __str__(self):
        return f"Stats for {self.current_year}"

class PopularCourse(models.Model):
    name = models.CharField(max_length=100)
    percentage = models.PositiveIntegerField()
    year = models.PositiveIntegerField()
    stats = models.ForeignKey(DashboardStat, on_delete=models.CASCADE, related_name='popular_courses')

    def __str__(self):
        return f"{self.name} ({self.year})"
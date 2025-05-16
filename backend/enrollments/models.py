from django.db import models
from users.models import User
from courses.models import CourseOffering

class Enrollment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('completed', 'Completed'),
    )
    
    student = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'user_type': 3})
    offering = models.ForeignKey(CourseOffering, on_delete=models.CASCADE)
    applied_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    comments = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.student} - {self.offering}"
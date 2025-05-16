from django.contrib import admin
from .models import CourseCategory, TrainingCenter, Course, CourseOffering

admin.site.register(CourseCategory)
admin.site.register(TrainingCenter)
admin.site.register(Course)
admin.site.register(CourseOffering)
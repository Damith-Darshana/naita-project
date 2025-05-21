from django.contrib import admin
from .models import CourseCategory, TrainingCenter, Course, CourseOffering

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('code', 'title', 'category', 'duration', 'fee', 'is_active')
    list_filter = ('category', 'is_active')
    search_fields = ('title', 'code', 'description')
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'code', 'category', 'description')
        }),
        ('Visual Elements', {
            'fields': ('thumbnail', 'background_image')
        }),
        ('Duration and Pricing', {
            'fields': ('duration', 'duration_unit', 'fee', 'registration_fee')
        }),
        ('Course Details', {
            'fields': ('certification', 'districts', 'features', 'content', 'requirements')
        }),
        ('Administrative', {
            'fields': ('syllabus', 'is_active')
        }),
    )

admin.site.register(CourseCategory)
admin.site.register(TrainingCenter)
admin.site.register(CourseOffering)
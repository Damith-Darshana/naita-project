from django.contrib import admin
from django import forms
from django_json_widget.widgets import JSONEditorWidget
from .models import Course, CourseCategory, TrainingCenter, CourseOffering, HeroContent, Service, DashboardStat, PopularCourse

class CourseAdminForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = '__all__'
        widgets = {
            'content': JSONEditorWidget,
            'features': JSONEditorWidget,
            'requirements': JSONEditorWidget,
            'districts': JSONEditorWidget,
        }

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    form = CourseAdminForm
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

# Keep rest as is
admin.site.register(CourseCategory)
admin.site.register(TrainingCenter)
admin.site.register(CourseOffering)
admin.site.register(HeroContent)

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'display_order', 'is_active')
    list_editable = ('display_order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('title', 'description')

class PopularCourseInline(admin.TabularInline):
    model = PopularCourse
    extra = 1

@admin.register(DashboardStat)
class DashboardStatAdmin(admin.ModelAdmin):
    list_display = ('current_year', 'last_updated', 'is_active')
    list_editable = ('is_active',)
    inlines = [PopularCourseInline]

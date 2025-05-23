from rest_framework import serializers
from .models import (
    CourseCategory, 
    TrainingCenter, 
    Course, 
    CourseOffering, 
    HeroContent,
    Service, 
    PopularCourse,
    DashboardStat,
    )

class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = '__all__'

class TrainingCenterSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingCenter
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    category = CourseCategorySerializer(read_only=True)
    duration_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = '__all__'
    
    def get_duration_display(self, obj):
        return obj.get_duration_display()

class CourseOfferingSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    center = TrainingCenterSerializer(read_only=True)
    
    class Meta:
        model = CourseOffering
        fields = '__all__'

class HeroContentSerializer(serializers.ModelSerializer):
    background_image = serializers.SerializerMethodField()

    def get_background_image(self, obj):
        if obj.background_image:
            return self.context['request'].build_absolute_uri(obj.background_image.url)
        return None

    class Meta:
        model = HeroContent
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title', 'description', 'icon_name', 'display_order']

class PopularCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopularCourse
        fields = ['name', 'percentage']

class DashboardStatSerializer(serializers.ModelSerializer):
    popular_courses = PopularCourseSerializer(many=True)
    
    class Meta:
        model = DashboardStat
        fields = ['active_learners', 'total_courses', 'proud_graduates', 'current_year', 'popular_courses']

from rest_framework import serializers
from .models import CourseCategory, TrainingCenter, Course, CourseOffering

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
    requirements = serializers.SerializerMethodField()

    
    class Meta:
        model = Course
        fields = '__all__'
    
    def get_requirements(self,obj):
        if obj.requirements:
            return [req.strip() for req in obj.requirements.split('\n') if req.strip()]
        return []

class CourseOfferingSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    center = TrainingCenterSerializer(read_only=True)
    
    class Meta:
        model = CourseOffering
        fields = '__all__'
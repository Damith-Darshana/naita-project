from rest_framework import serializers
from .models import Enrollment
from users.serializers import UserSerializer
from courses.serializers import CourseOfferingSerializer

class EnrollmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['offering', 'comments']

class EnrollmentSerializer(serializers.ModelSerializer):
    student = UserSerializer(read_only=True)
    offering = CourseOfferingSerializer(read_only=True)
    
    class Meta:
        model = Enrollment
        fields = '__all__'
        read_only_fields = ['student', 'status', 'applied_date']
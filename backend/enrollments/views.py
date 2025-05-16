from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils import timezone
from .models import Enrollment
from .serializers import EnrollmentSerializer
from users.models import User
from courses.models import CourseOffering

class EnrollmentViewSet(viewsets.ModelViewSet):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == 3:  # Student
            return Enrollment.objects.filter(student=user)
        elif user.user_type == 2:  # Instructor
            return Enrollment.objects.filter(offering__instructor=user)
        return Enrollment.objects.all()  # Admin

    def perform_create(self, serializer):
        if self.request.user.user_type != 3:
            raise permissions.PermissionDenied("Only students can create enrollments")
        serializer.save(student=self.request.user)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        enrollment = self.get_object()
        if request.user.user_type not in [1, 2]:  # Only admin/instructor
            raise permissions.PermissionDenied()
        
        enrollment.status = 'approved'
        enrollment.save()
        return Response({'status': 'enrollment approved'})

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        enrollment = self.get_object()
        if request.user.user_type not in [1, 2]:  # Only admin/instructor
            raise permissions.PermissionDenied()
        
        enrollment.status = 'rejected'
        enrollment.save()
        return Response({'status': 'enrollment rejected'})
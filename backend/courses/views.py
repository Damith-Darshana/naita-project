from django.shortcuts import render

# Create your views here.
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets,filters, generics
from .models import CourseCategory, TrainingCenter, Course, CourseOffering , HeroContent,Service,DashboardStat
from .serializers import (
    CourseCategorySerializer, 
    TrainingCenterSerializer, 
    CourseSerializer, 
    CourseOfferingSerializer, 
    HeroContentSerializer,
    ServiceSerializer, 
    DashboardStatSerializer
    )

class CourseCategoryViewSet(viewsets.ModelViewSet):
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer

class TrainingCenterViewSet(viewsets.ModelViewSet):
    queryset = TrainingCenter.objects.all()
    serializer_class = TrainingCenterSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.filter(is_active=True)
    serializer_class = CourseSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = {
        'category': ['exact'],
        'duration': ['gte', 'lte'],  # For duration range filtering
        'fee': ['gte', 'lte'],  # For fee range filtering
    }
    search_fields = ['title', 'code', 'description']
  

class CourseOfferingViewSet(viewsets.ModelViewSet):
    queryset = CourseOffering.objects.filter(is_active=True)
    serializer_class = CourseOfferingSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'course': ['exact'],
        'center': ['exact'],
        'start_date': ['gte', 'lte', 'exact'],
    }

class HeroContentView(generics.RetrieveAPIView):
    serializer_class = HeroContentSerializer

    def get_object(self):
        return HeroContent.objects.filter(is_active=True).first()
    

class ServiceListView(generics.ListAPIView):
    serializer_class = ServiceSerializer
    queryset = Service.objects.filter(is_active=True).order_by('display_order')

class DashboardStatView(generics.RetrieveAPIView):
    serializer_class = DashboardStatSerializer
    
    def get_object(self):
        return DashboardStat.objects.filter(is_active=True).first()


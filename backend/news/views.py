from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import NewsCategory, NewsPost
from .serializers import NewsCategorySerializer, NewsPostSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class NewsCategoryViewSet(viewsets.ModelViewSet):
    queryset = NewsCategory.objects.filter(is_active=True)
    serializer_class = NewsCategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

class NewsPostViewSet(viewsets.ModelViewSet):
    queryset = NewsPost.objects.filter(is_active=True).select_related('category', 'author')
    serializer_class = NewsPostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'post_type']
    search_fields = ['title', 'description', 'content']
    ordering_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']
    lookup_field = 'slug'
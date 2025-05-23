from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (
        CourseCategoryViewSet,
        TrainingCenterViewSet,
        CourseViewSet,
        CourseOfferingViewSet,
        HeroContentView,
        ServiceListView,
        DashboardStatView,
        )

router = DefaultRouter()
router.register(r'categories', CourseCategoryViewSet)
router.register(r'centers', TrainingCenterViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'offerings', CourseOfferingViewSet)

urlpatterns = router.urls + [
  path('hero-content/', HeroContentView.as_view(), name='hero-content'),
  path('services/', ServiceListView.as_view(), name='service-list'),
  path('dashboard-stats/', DashboardStatView.as_view(), name='dashboard-stats'),
]

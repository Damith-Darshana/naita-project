from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CourseCategoryViewSet, TrainingCenterViewSet, CourseViewSet, CourseOfferingViewSet

router = DefaultRouter()
router.register(r'categories', CourseCategoryViewSet)
router.register(r'centers', TrainingCenterViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'offerings', CourseOfferingViewSet)

urlpatterns = router.urls
from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import NewsCategoryViewSet, NewsPostViewSet

router = DefaultRouter()
router.register(r'categories', NewsCategoryViewSet)
router.register(r'posts', NewsPostViewSet)

urlpatterns = router.urls
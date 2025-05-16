from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, LoginView, RegisterView, LogoutView

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
] + router.urls
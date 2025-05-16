from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="NAITA API",
      default_version='v1',
      description="National Apprentice and Industrial Training Authority API",
   ),
   public=True,
)

urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('admin/', admin.site.urls),
    path('api/courses/', include('courses.urls')),
    path('api/users/', include('users.urls')),
    path('api/enrollments/', include('enrollments.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
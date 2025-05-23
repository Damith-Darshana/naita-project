from django.db import models

from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()

class NewsCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "News Categories"

    def __str__(self):
        return self.name

class NewsPost(models.Model):
    class PostType(models.TextChoices):
        ANNOUNCEMENT = 'AN', _('Announcement')
        NEWS = 'NW', _('News')
        UPDATE = 'UP', _('Update')

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField()
    content = models.TextField()
    image = models.ImageField(upload_to='news_images/')
    category = models.ForeignKey(NewsCategory, on_delete=models.SET_NULL, null=True, blank=True)
    post_type = models.CharField(max_length=2, choices=PostType.choices, default=PostType.NEWS)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created_at']
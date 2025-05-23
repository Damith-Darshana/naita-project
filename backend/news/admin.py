

# Register your models here.
from django.contrib import admin
from .models import NewsCategory, NewsPost

@admin.register(NewsCategory)
class NewsCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'is_active')
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ('is_active',)
    search_fields = ('name',)

@admin.register(NewsPost)
class NewsPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'post_type', 'category', 'author', 'is_active', 'created_at')
    list_filter = ('post_type', 'category', 'is_active')
    search_fields = ('title', 'description', 'content')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('is_active',)
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'description', 'content', 'image')
        }),
        ('Classification', {
            'fields': ('category', 'post_type')
        }),
        ('Administrative', {
            'fields': ('author', 'is_active')
        }),
    )
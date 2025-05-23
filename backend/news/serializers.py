from rest_framework import serializers
from .models import NewsCategory, NewsPost
from users.serializers import UserSerializer

class NewsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsCategory
        fields = ['id', 'name', 'slug']

class NewsPostSerializer(serializers.ModelSerializer):
    category = NewsCategorySerializer(read_only=True)
    author = UserSerializer(read_only=True)
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = NewsPost
        fields = [
            'id', 'title', 'slug', 'description', 'content', 
            'image_url', 'category', 'post_type', 'author',
            'created_at', 'updated_at'
        ]
    
    def get_image_url(self, obj):
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None
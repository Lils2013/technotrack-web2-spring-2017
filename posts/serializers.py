from rest_framework import serializers

from core.serializers import BasicUserSerializer
from posts.models import Post


class PostSerializer(serializers.ModelSerializer):
    author = BasicUserSerializer(read_only=True)
    likes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()

    class Meta:
        model = Post
        fields = ('id', 'author', 'likes_count', 'comments_count', 'created', 'text')
        #    fields = '__all__'

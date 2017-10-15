from rest_framework import serializers

from likes.models import Like
from posts.models import Post


class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Like
        # fields = ('id', 'author', 'likes_count', 'comments_count', 'created', 'text')
        fields = '__all__'

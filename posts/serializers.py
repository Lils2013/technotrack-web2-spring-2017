from django.contrib.contenttypes.models import ContentType
from rest_framework import serializers

from core.serializers import BasicUserSerializer
from likes.models import Like
from posts.models import Post


class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author_id')
    likes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()
    liked = serializers.SerializerMethodField()
    liked_id = serializers.SerializerMethodField()

    def get_liked(self, obj):
        current_user = self.context['request'].user
        like = Like.objects.filter(content_type=ContentType.objects.get_for_model(Post),
                                   object_id=obj.id,
                                   author=current_user)
        if like:
            return True
        else:
            return False

    def get_liked_id(self, obj):
        current_user = self.context['request'].user
        like = Like.objects.filter(content_type=ContentType.objects.get_for_model(Post),
                                   object_id=obj.id,
                                   author=current_user)
        if like:
            return like.get().id
        else:
            return 0

    class Meta:
        model = Post
        fields = ('id', 'author', 'likes_count', 'comments_count', 'created', 'text', 'liked', 'liked_id')
        #    fields = '__all__'

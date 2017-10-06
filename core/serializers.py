from rest_framework import serializers
from posts.models import Post
from .models import User


class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author_id')
    likes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()

    class Meta:
        model = Post
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','last_login','username','first_name','last_name','email','date_joined')

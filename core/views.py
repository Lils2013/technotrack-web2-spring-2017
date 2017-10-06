from rest_framework.viewsets import ModelViewSet
from .serializers import PostSerializer, UserSerializer
from posts.models import Post
from .models import User


class PostViewSet(ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

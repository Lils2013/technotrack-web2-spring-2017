from rest_framework.viewsets import ModelViewSet
from .serializers import PostSerializer, FullUserSerializer, BasicUserSerializer
from posts.models import Post
from .models import User
from rest_framework import permissions
from .permissions import IsOwnerOrReadOnly


class PostViewSet(ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def get_queryset(self):
        qs = super(PostViewSet, self).get_queryset()
        if self.request.query_params.get('username'):
            qs = qs.filter(author__username=self.request.query_params.get('username'))
        return qs

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)


class UserViewSet(ModelViewSet):
    serializer_class = FullUserSerializer
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated,)

    def get_serializer_class(self):
        if 'pk' in self.kwargs:
            user_id = int(self.kwargs['pk'])
            if self.request.user.id == user_id:
                return FullUserSerializer
        if self.request.user.is_staff:
            return FullUserSerializer
        else:
            return BasicUserSerializer

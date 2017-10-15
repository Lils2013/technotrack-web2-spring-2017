from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import detail_route
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from core.permissions import IsOwnerOrReadOnly
from likes.serializers import LikeSerializer
from posts.serializers import PostSerializer
from posts.models import Post
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from subscriptions.models import Subscription


class PostViewSet(ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def get_queryset(self):
        qs = super(PostViewSet, self).get_queryset()
        if 'pk' in self.kwargs:
            # post_id = int(self.kwargs['pk'])
            # post = qs.filter(id=post_id).first()
            # if Subscription.objects.filter(author=self.request.user) \
            #         .filter(target=post.author):
            #     qs = qs.filter(id=post_id)
            # elif self.request.user == post.author:
            #     qs = qs.filter(id=post_id)
            # else:
            #     raise PermissionDenied('You must be subscribed to view the events')
            pass
        elif self.request.query_params.get('username'):
            if Subscription.objects.filter(author=self.request.user) \
                    .filter(target__username=self.request.query_params.get('username')):
                qs = qs.filter(author__username=self.request.query_params.get('username'))
            elif self.request.user.username == self.request.query_params.get('username'):
                qs = qs.filter(author=self.request.user)
            else:
                raise PermissionDenied('You must be subscribed to view the post list')
        else:
            qs = qs.filter(author=self.request.user)
        return qs

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)

    @detail_route()
    def likes(self, request, pk=None):
        post = self.get_object()
        likes = post.likes.all()
        serializer = LikeSerializer(likes, many=True)
        return Response(serializer.data)

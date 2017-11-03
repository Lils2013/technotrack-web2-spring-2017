from django.contrib.contenttypes.models import ContentType
from rest_framework.decorators import detail_route
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from core.permissions import IsOwnerOrReadOnly
from likes.models import Like
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
        if self.request.query_params.get('username'):
            if Subscription.objects.filter(author=self.request.user) \
                    .filter(target__username=self.request.query_params.get('username')) or \
                            self.request.user.username == self.request.query_params.get('username'):
                qs = qs.filter(author__username=self.request.query_params.get('username'))
            else:
                raise PermissionDenied('You must be subscribed to view the post list')
        else:
            targets = Subscription.objects.filter(author=self.request.user).values_list('target', flat=True)
            targets_list = list(targets)
            targets_list.append(self.request.user)
            qs = qs.filter(author__in=targets_list)
        return qs.order_by('id')

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)

    @detail_route(methods=['post', 'get'])
    def likes(self, request, pk=None):
        old_like = Like.objects.filter(content_type=ContentType.objects.get_for_model(Post),
                                       object_id=self.get_object().id,
                                       author=request.user)
        if self.request.query_params.get('self'):
            if old_like:
                return Response({'liked': True, 'id': pk})
            else:
                return Response({'liked': False, 'id': pk})
        if request.method == 'POST':

            if old_like:
                serializer = LikeSerializer(old_like.get())
                return Response(serializer.data)
            new_like = Like(object=self.get_object(), author=request.user)
            new_like.save()
            serializer = LikeSerializer(new_like)
            return Response(serializer.data)
        else:
            post = self.get_object()
            likes = post.likes.all()
            serializer = LikeSerializer(likes, many=True)
            return Response(serializer.data)

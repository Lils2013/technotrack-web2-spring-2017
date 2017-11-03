from core.permissions import IsOwnerOrReadOnly
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from subscriptions.models import Subscription
from subscriptions.serializers import SubscriptionSerializer


class SubscriptionViewSet(ModelViewSet):
    serializer_class = SubscriptionSerializer
    queryset = Subscription.objects.all()
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    # def get_queryset(self):
    #     qs = super(SubscriptionViewSet, self).get_queryset()
    #     qs = qs.filter(author=self.request.user)
    #     return qs.order_by('id')

    def get_queryset(self):
        qs = super(SubscriptionViewSet, self).get_queryset()
        if self.request.query_params.get('username'):
            qs = qs.filter(author__username=self.request.query_params.get('username'))
        else:
            qs = qs.filter(author=self.request.user)
        return qs.order_by('id')

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)
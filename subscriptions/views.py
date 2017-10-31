from core.permissions import IsOwnerOrReadOnly
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from subscriptions.models import Subscription
from subscriptions.serializers import SubscriptionSerializer


class SubscriptionViewSet(ModelViewSet):
    serializer_class = SubscriptionSerializer
    queryset = Subscription.objects.all()
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def get_queryset(self):
        qs = super(SubscriptionViewSet, self).get_queryset()
        qs = qs.filter(target=self.request.user)
        return qs.order_by('id')

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)
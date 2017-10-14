from __future__ import print_function

from rest_framework.exceptions import PermissionDenied
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from core.permissions import IsUserOrReadOnly, IsOwnerOrReadOnly
from events.models import Event
from events.serializers import EventSerializer
from subscriptions.models import Subscription


class EventViewSet(ModelViewSet):
    serializer_class = EventSerializer
    queryset = Event.objects.all()
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)

    def get_queryset(self):
        qs = super(EventViewSet, self).get_queryset()
        if 'pk' in self.kwargs:
            pass
        elif self.request.query_params.get('username'):
            if Subscription.objects.filter(author=self.request.user) \
                    .filter(target__username=self.request.query_params.get('username')):
                qs = qs.filter(author__username=self.request.query_params.get('username'))
            elif self.request.user.username == self.request.query_params.get('username'):
                qs = qs.filter(author=self.request.user)
            else:
                raise PermissionDenied('You must be subscribed to view the event list')
        else:
            qs = qs.filter(author=self.request.user)
        return qs

from rest_framework.viewsets import ModelViewSet
from .serializers import FullUserSerializer, BasicUserSerializer
from .models import User
from rest_framework import permissions
from .permissions import IsUserOrReadOnly
from django.shortcuts import render_to_response, render


class UserViewSet(ModelViewSet):
    serializer_class = FullUserSerializer
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated, IsUserOrReadOnly)

    def get_serializer_class(self):
        if self.request.user.is_staff:
            return FullUserSerializer
        if 'pk' in self.kwargs:
            user_id = int(self.kwargs['pk'])
            if self.request.user.id == user_id:
                return FullUserSerializer
        else:
            return BasicUserSerializer

    def get_queryset(self):
        qs = super(UserViewSet, self).get_queryset()
        if self.request.query_params.get('self'):
            qs = qs.filter(id=self.request.user.id)
        return qs.order_by('id')


def react(request):
    return render(request, "core/index.html")

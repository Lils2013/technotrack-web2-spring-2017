from rest_framework.viewsets import ModelViewSet
from .serializers import FullUserSerializer, BasicUserSerializer
from .models import User
from rest_framework import permissions
from .permissions import IsUserOrReadOnly


class UserViewSet(ModelViewSet):
    serializer_class = FullUserSerializer
    queryset = User.objects.all()
    permission_classes = (permissions.IsAuthenticated, IsUserOrReadOnly)

    def get_serializer_class(self):
        if 'pk' in self.kwargs:
            user_id = int(self.kwargs['pk'])
            if self.request.user.id == user_id:
                return FullUserSerializer
        if self.request.user.is_staff:
            return FullUserSerializer
        else:
            return BasicUserSerializer

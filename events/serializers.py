from rest_framework import serializers

from core.serializers import BasicUserSerializer
from events.models import Event


class EventSerializer(serializers.ModelSerializer):
    author = BasicUserSerializer(read_only=True)

    class Meta:
        model = Event
        fields = ('id', 'author', 'created', 'title')
        # fields = '__all__'

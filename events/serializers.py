from rest_framework import serializers
from events.models import Event


class EventSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author_id')

    class Meta:
        model = Event
        fields = ('id', 'author', 'created', 'title')
        # fields = '__all__'

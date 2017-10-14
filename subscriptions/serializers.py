from rest_framework import serializers
from .models import Subscription


class SubscriptionSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author_id')

    class Meta:
        model = Subscription
        fields = ('created', 'author', 'target')
        # fields = '__all__'

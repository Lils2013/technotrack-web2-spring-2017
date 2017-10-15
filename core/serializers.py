from rest_framework import serializers
from .models import User


class FullUserSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField()
    date_joined = serializers.ReadOnlyField()
    last_login = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ('id', 'last_login', 'username', 'first_name', 'last_name', 'email', 'date_joined', 'is_superuser')
        # fields = '__all__'


class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'username')

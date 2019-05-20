from rest_framework import serializers
from django.contrib.auth.models import User

from api.models import Contacts


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class PostSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    phone = serializers.CharField()
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Contacts
        fields = '__all__'

from rest_framework import serializers
from api.models import Contact
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class ContactSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=False)
    phone = serializers.CharField(required=False)
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Contact
        fields = ('id', 'name', 'phone', 'created_by')

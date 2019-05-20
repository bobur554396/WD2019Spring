from django.contrib.auth.models import User
from rest_framework import serializers

from api.models import Contact


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)


class ContactSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)

    class Meta:
        model = Contact
        fields = '__all__'

from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Contact


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)

class ContactSerialier(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Contact
        fields = ('id', 'name', 'created_by',)
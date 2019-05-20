import django.contrib.auth.models
from rest_framework import serializers

from django.contrib.auth.models import User
from api.models import Contact

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = django.contrib.auth.models.User
        fields = [
            'id',
            'username',
            'email'
        ]



class ContactSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    phone = serializers.CharField()
    name = serializers.CharField()
    list = serializers.ForeignKey(read_only=True)

    class Meta:
        model =Contact
        fields = [
            'id',
            'name',
            'phone',
            'list'
        ]

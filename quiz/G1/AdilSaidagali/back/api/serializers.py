from rest_framework import serializers
from api.models import Contact
from django.contrib.auth.models import User

import datetime

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class ContactSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    phone = serializers.CharField()
    created_by = UserSerializer()

    class Meta:
        model = Contact
        fields = ('id', 'name', 'phone', 'created_by', )


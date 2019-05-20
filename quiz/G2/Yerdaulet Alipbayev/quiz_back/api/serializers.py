from rest_framework import serializers
from api.models import Contacts
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    phone = serializers.CharField()
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Contacts
        fields = '__all__'
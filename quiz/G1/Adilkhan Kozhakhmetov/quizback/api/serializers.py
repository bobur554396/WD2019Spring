from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Contact


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('created_by', 'name', 'phone', 'id')
        read_only_fields = ('created_by', 'id')
        required_field_names = ()


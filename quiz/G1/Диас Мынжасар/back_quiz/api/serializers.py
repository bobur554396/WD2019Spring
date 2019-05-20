from django.contrib.auth.models import User
from rest_framework import serializers
from api.models import Contact

class UserSerializer (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email')


class ContactSerializer (serializers.ModelSerializer):
    class Meta:
        model = Contact
        id = serializers.IntegerField (read_only=True)
        name = serializers.CharField (required=True)
        phone = serializers.CharField (required=True)
        created_by = UserSerializer(read_only=True)
        fields = ('id', 'name', 'created_by')

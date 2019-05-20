from rest_framework import serializers
from .models import Contact
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class UserSerializer2(serializers.ModelSerializer):
    class Meta:
        model = User
        fields ='__all__'

class ContactSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    phone = serializers.CharField(required=False)
    created_by = UserSerializer(read_only = True)

    class Meta:
        model = Contact
        fields = '__all__'


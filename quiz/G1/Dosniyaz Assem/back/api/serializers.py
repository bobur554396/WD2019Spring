from rest_framework import serializers
from api.models import Contact
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =('id','username')


class ContactSerializer(serializers.ModelSerializer):
    id =serializers.IntegerField(read_only=True)
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Contact
        fields = '__all__'


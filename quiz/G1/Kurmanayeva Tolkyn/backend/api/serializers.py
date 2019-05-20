from api.models import Contact
from rest_framework import serializers
from django.contrib.auth.models import User




class ContactSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField
    phone = serializers.CharField

    class Meta:
        model = Contact
        fields = ('id', 'name', 'phone')



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)
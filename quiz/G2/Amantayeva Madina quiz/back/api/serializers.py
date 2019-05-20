from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Contacts


class ContactsSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)

    def create(self, validated_data):
        contacts = Contacts(**validated_data)
        contacts.save()
        return contacts

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)


class ContactsSerializer2(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)

    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Contacts
        fields = ('id', 'name', 'phone', 'created_by')
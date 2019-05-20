from rest_framework import serializers
from django.contrib.auth.models import User

from quiz.api.models import Contact, ContactList


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class ContactSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    phone = serializers.CharField()
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Contact
        fields = '__all__'
class ContactListSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=200)

    def create(self, validated_data):
        contact_list = ContactList(**validated_data)
        contact_list.save()
        return contact_list

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


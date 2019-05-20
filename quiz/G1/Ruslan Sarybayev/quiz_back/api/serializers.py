from rest_framework import serializers
from api.models import Contact
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)

class ContactSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)
    created_by = UserSerializer(read_only=True)

    def create(self, validated_data):
        contact = Contact(**validated_data)
        contact.save()
        return contact
    def update(self, instance, validated_data):
        instance.name = validated_data.get('name')
        instance.phone = validated_data.get('phone')
        instance.created_by = validated_data.get('created_by')
        instance.save()
        return instance
from rest_framework import serializers
from api.models import Contact
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class ContactSerializer2(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)
    created_by = UserSerializer(read_only=True)

    def create(self, validated_data):
        contactlist = Contact(**validated_data)
        contactlist.save()
        return contactlist

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

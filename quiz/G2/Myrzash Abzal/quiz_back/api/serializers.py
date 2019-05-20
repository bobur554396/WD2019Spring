from rest_framework import serializers
from api.models import Contact
from django.contrib.auth.models import User


class ContactSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)

    def create(self, validated_data):
        # {'name': 'new Contact 3'}
        # name='new Contact 3'
        contact = Contact(**validated_data)
        Contact.save()
        return contact

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)


class ContactSerializer2(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    phone = serializers.CharField()

    # products = serializers.StringRelatedField(many=True)
    # products = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Contact
        fields = ('id', 'name', 'phone')

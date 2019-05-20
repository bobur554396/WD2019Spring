from rest_framework import serializers
from django.contrib.auth.models import ContactSerializer
from api.models import ContactSerializer


class ContactSerializer(serializers.Serializer):
    name = serializers.CharField(read_only=True)
    phone = serializers.CharField(required=True)

    def create(self, validated_data):
        contact = ContactSerializer(**validated_data)
        contact.save()
        return contact

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSerializer
        fields = ('name', 'phone')


class ContactSerializer2(serializers.ModelSerializer):
    name = serializers.CharField(read_only=True)
    phone= serializers.CharField(required=True)
    created_by = ContactSerializer(read_only=True)

    class Meta:
        model = ContactSerializer
        fields = ('id', 'name', 'created_by',)



class ProductSerializer(serializers.Serializer):
    name = serializers.CharField()
    phone = serializers.CharField()

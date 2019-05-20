from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Contact



class ContactSerializer(serializers.Serializer):
    name = serializers.CharField()
    phone = serializers.IntegerField()

    def create(self, validated_data):
        t_tl = Contact(**validated_data)
        t_tl.save()

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()


class ContactSerializerModel(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)

    class Meta:
        model = Contact
        fields = ('id', 'name', 'phone')


class ContactSerializer(serializers.Serializer):
    name = serializers.CharField()
    phone = serializers.IntegerField()


class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('id', 'username', )
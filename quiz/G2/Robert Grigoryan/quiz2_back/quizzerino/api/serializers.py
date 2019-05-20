from rest_framework import serializers
from .models import CreatedBy
from django.contrib.auth.models import User



class CreatedBySerializer0(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)

    def create(self, validated_data):
        contactlist = CreatedBy(**validated_data)
        contactlist.save()
        return contactlist

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','phone')


class CreatedBySerializer1(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    created_by = UserSerializer(read_only=True)
    class Meta:
        model = CreatedBy
        fields = ('id', 'name', 'created_by',)


class ContactsSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    phone = serializers.CharField()
    created_by = CreatedBySerializer0()



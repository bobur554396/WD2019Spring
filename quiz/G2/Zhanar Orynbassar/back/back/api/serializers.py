from rest_framework import serializers
from .models import Contact
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class ContactSerializer(serializers.ModelSerializer):
    id=serializers.IntegerField(read_only=True)
    name=serializers.CharField(max_length=200)
    phone=serializers.CharField(max_length=200)
    created_by=UserSerializer()

    class Meta:
        model=Contact
        fields=('id','name','phone','created_by')

    # def create(self, validated_data):
    #     return Contact.objects.create(**validated_data)
    #
    # def update(self, instance, validated_data):
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.phone = validated_data.get('phone', instance.created_at)
    #     instance.created_by = validated_data.get('created_by', instance.task_list)
    #     instance.save()
    #     return instance


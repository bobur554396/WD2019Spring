from rest_framework import serializers
from .models import Contact, ContactList
from django.contrib.auth.models import User

class ListSerializer(serializers.Serializer):
    id=serializers.IntegerField(read_only=True)
    name=serializers.CharField(required=True)

    def create(self,validated_data):
        li=ContactList(**validated_data)
        li.save()
        return li

    def update(self, instance, validated_data):
        instance.name=validated_data.get('name',instance.name)
        instance.save()
        return instance

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =('id','username', 'email',)

class ListSerializer2(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    created_by= UserSerializer(read_only=True)
    listik = ContactList()

    class Meta:
        model = ContactList
        fields = ('id', 'name','created_by',)

class ContactSerializer2(serializers.ModelSerializer):
    id=serializers.IntegerField(read_only=True)
    name=serializers.CharField(required=True)
    phone = serializers.CharField(required=True)
    created_by = UserSerializer(read_only=True)
    class Meta:
        model= Contact
        fields=('id','name','created_by','phone',)





class ContactSerializer(serializers.Serializer):
    id=serializers.IntegerField(read_only=True)
    name=serializers.CharField(required=True)
    listik = ContactList()
    created_by =UserSerializer(read_only=True)

    def create(self,validated_data):
        li=Contact(**validated_data)
        li.contact_list = ContactSerializer.listik
        li.save()
        print(ContactSerializer.listik)
        return li




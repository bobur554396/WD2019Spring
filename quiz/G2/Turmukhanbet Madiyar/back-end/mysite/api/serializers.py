from rest_framework import serializers
from api.models import Contact
from api.models import User


class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ('id', 'name',)
        # fields = '__all__'


class ContactSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    phone = serializers.CharField()

    def create(self, validated_data):
        contact = Contact(**validated_data)
        contact.save()
        return contact

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.phone = validated_data.get('phone', instance.name)
        instance.save()
        return instance


class ContactSerializer2(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)

    class Meta:
        model = Contact
        fields = ('id', 'name', 'phone')
        # fields = '__all__'
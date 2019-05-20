from rest_framework import serializers
from api.models import Contact


class ContactSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    phone = serializers.CharField(required=True)

    def create(self, validated_data):
        contact = Contact(**validated_data)
        contact.save()
        return contact

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.save()
        return instance


class ContactSerializer2(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    phone = serializers.CharField()
    class Meta:
        model = Contact
        fields = ('id', 'name', 'phone')
        # fields = '__all__'
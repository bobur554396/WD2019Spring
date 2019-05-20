from rest_framework import serializers
from api.models import Contact

class ContactSerializer(serializers.Serializer):
    name = serializers.Charfield(read_only = True)
    phone = serializers.Charfield(read_only = True)

    def create(self, validated_data):
        contact = Contact(**validated_data)
        contact.save()
        return contact

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

class ContactSerializer2(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(read_only=True)
    phone = serializers.CharField(required=True)

    class Meta:
        model = Contact
        fields = ('id', 'name', 'phone')

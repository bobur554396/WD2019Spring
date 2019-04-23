from rest_framework import serializers
from django.contrib.auth.models import User
from api.models import Category, Product


class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)

    def create(self, validated_data):
        # {'name': 'new category 4'}
        # name='new category 4'
        category = Category(**validated_data)
        category.save()
        return category

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)


class ProductSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    category_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'count', 'category_id',)


class ProductSerializer2(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'name', 'price', 'count',)


class CategorySerializer2(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(required=True)
    created_by = UserSerializer(read_only=True)
    # products = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # products = serializers.StringRelatedField(many=True)
    products = ProductSerializer2(many=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'created_by', 'products')

    def create(self, validated_data):
        products = validated_data.pop('products')
        category = Category.objects.create(**validated_data)
        # for product in products:
        #     Product.objects.create(category=category, **product)

        arr = [Product(category=category, **product) for product in products]
        Product.objects.bulk_create(arr)
        # BUNCH_SIZE = 500
        # for i in range(0, len(arr), BUNCH_SIZE):
        #     Product.objects.bulk_create(arr[i:i+BUNCH_SIZE])

        return category


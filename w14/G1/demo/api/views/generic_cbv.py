from api.models import Category, Product
from django.contrib.auth.models import User
from api.serializers import CategorySerializer2, UserSerializer, ProductSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.http import Http404
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from api.filters import ProductFilter
from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination


class CategoryProductsAPIView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination
    filter_backends = (DjangoFilterBackend, SearchFilter, OrderingFilter)
    # TODO DjangoFilterBackend
    # filterset_fields = ('name', 'price',)
    filter_class = ProductFilter

    # TODO SearchFilter
    search_fields = ('name', 'price', 'count')

    # TODO OrderingFilter
    ordering_fields = ('name', 'price')
    ordering = ('price', )

    def get_queryset(self):
        # category = get_object_or_404(Category, id=self.kwargs['pk'])
        try:
            category = Category.objects.get(id=self.kwargs['pk'])
        except Category.DoesNotExist:
            raise Http404

        queryset = category.products.all()
        # name = self.request.query_params.get('name', None)
        # if name is not None:
        #     queryset = queryset.filter(name=name)
        return queryset


# class CategoryProductCreateAPIView(generics.CreateAPIView):
#     queryset = Product.objects.all()
#     serializer_class = ProductSerializer


class CategoryList2(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer2
    http_method_names = ['get']


class CategoryList(generics.ListCreateAPIView):
    # queryset = Category.objects.all()
    # serializer_class = CategorySerializer2
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Category.objects.for_user_order_by_name(self.request.user)

    def get_serializer_class(self):
        return CategorySerializer2

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer2

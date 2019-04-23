from django.http import Http404
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination

from api.models import Category, Product
from api.serializers import CategorySerializer2, ProductSerializer

from api.filters import ProductFilter


class CategoryList(generics.ListCreateAPIView):
    serializer_class = CategorySerializer2
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Category.objects.for_user(self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer2


class CategoryProductList(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    pagination_class = LimitOffsetPagination
    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter,
                       filters.OrderingFilter)

    # TODO DjangoFilterBackend
    filter_class = ProductFilter
    # filterset_fields = ('name', 'price')

    # TODO SearchFilter
    search_fields = ('name', 'price', 'count')

    # TODO OrderingFilter
    ordering_fields = ('name', 'price')

    ordering = ('price',)

    def get_queryset(self):
        # category = get_object_or_404(Category, id=self.kwargs.get('pk'))
        try:
            category = Category.objects.get(id=self.kwargs.get('pk'))
        except Category.DoesNotExist:
            raise Http404
        queryset = category.products.all()

        # TODO Query params
        # name = self.request.query_params.get('name', None)
        # price = self.request.query_params.get('price', None)
        # if name is not None and price is not None:
        #     queryset = queryset.filter(name=name).filter(price=price)

        return queryset

from django_filters import rest_framework as filters
from api.models import Product


class ProductFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')
    # price = filters.NumberFilter(lookup_expr='exact')
    min_price = filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = filters.NumberFilter(field_name='price', lookup_expr='lte')

    class Meta:
        model = Product
        fields = ('name', 'min_price', 'max_price',)

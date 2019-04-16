from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from api.models import Category
from api.serializers import CategorySerializer2


class CategoryList(generics.ListCreateAPIView):
    # queryset = Category.objects.all()
    # serializer_class = CategorySerializer2
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return Category.objects.for_user(self.request.user)

    def get_serializer_class(self):
        return CategorySerializer2

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer2

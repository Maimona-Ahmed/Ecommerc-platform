from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter,OrderingFilter
from .models import Category,Product
from .serializers import CategorySerializer,ProductSerializer

class CategoryViewSet(ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field ="slug"

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class=ProductSerializer
    lookup_field = "slug"
    filter_backends = [DjangoFilterBackend,SearchFilter,OrderingFilter]
    filterset_fields = ["category"]
    search_fields = ["name","description"]
    ordering_fields = ["name","price","created_at"]
    ordering = ["-created_at"]
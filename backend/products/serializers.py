from rest_framework import serializers
from .models import Category,Product,ProductImage,ProductAttribute,VariationOption,Variation,ProductVariantOption,ProductVariant

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id","name","slug","image"]

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ["id","image","is_primary"]

class ProductAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model=ProductAttribute
        fields= ["id","name","value"] 
        read_only_fields=["id"]   

class VariationOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model=VariationOption
        fields= ["id","value"] 
        read_only_fields=["id"]  

class VariationSerializer(serializers.ModelSerializer):
    options =VariationOptionSerializer(many=True,read_only=True)
    class Meta:
        model=Variation
        fields= ["id","name","options"] 
        read_only_fields=["id"] 

class ProductVariantOptionSerializer(serializers.ModelSerializer):
    option_value = serializers.CharField(source="option.value",read_only=True)
    variation_name = serializers.CharField(source="option.variation.name",read_only=True)
    class Meta:
        model = ProductVariantOption
        fields = ["id","option","option_value","variation_name"]
        read_only_fields=["id"] 

class ProductVariantSerializer(serializers.ModelSerializer):
    options = ProductVariantOptionSerializer(source="variant_options",many=True,read_only=True)
    availability = serializers.CharField(source="get_availability_display",read_only=True)
    class Meta:
        model = ProductVariant
        fields= ["id","sku","price","stock","availability","options"]
        read_only_fields = ["id","availability"]

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True,read_only=True)
    attributes = ProductAttributeSerializer(many=True,read_only=True)
    variations = VariationSerializer(many=True,read_only=True)
    variants = ProductVariantSerializer(many=True,read_only=True)

    class Meta:
        model = Product
        fields = ["id","category","name","slug","description","price","stock",
                  "is_active","images","attributes","variations","variants","created_at","updated_at"]
        read_only_fields = ["id","slug","created_at","updated_at"]
from rest_framework import serializers

from .models import Cart, CartItem

from products.serializers import ProductVariantSerializer


class CartItemSerializer(serializers.ModelSerializer):

    variant = ProductVariantSerializer(
        read_only=True
    )

    product_name = serializers.CharField(
        source="variant.product.name",
        read_only=True
    )

    product_image = serializers.SerializerMethodField()

    subtotal = serializers.SerializerMethodField()


    class Meta:

        model = CartItem

        fields = [
            "id",
            "variant",

            "product_name",
            "product_image",

            "quantity",
            "subtotal",
        ]

        read_only_fields = [
            "id",
            "product_name",
            "product_image",
            "subtotal",
        ]


    def get_product_image(self, obj):

        image = (
            obj.variant.product.images
            .filter(is_primary=True)
            .first()
        )

        if image:
            return image.image.url

        image = (
            obj.variant.product.images
            .first()
        )

        if image:
            return image.image.url

        return None


    def get_subtotal(self, obj):

        return (
            obj.variant.price *
            obj.quantity
        )


class CartSerializer(serializers.ModelSerializer):

    items = CartItemSerializer(
        many=True,
        read_only=True
    )

    total = serializers.SerializerMethodField()


    class Meta:

        model = Cart

        fields = [
            "id",
            "items",
            "total",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "total",
            "created_at",
            "updated_at",
        ]


    def get_total(self, obj):

        return sum(
            item.variant.price * item.quantity
            for item in obj.items.all()
        )

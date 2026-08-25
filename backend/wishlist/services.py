
from .models import Wishlist, WishlistItem
from products.models import Product
from rest_framework.exceptions import ValidationError


class WishlistService:

    @staticmethod
    def add_to_wishlist(user, product):
        wishlist, created = Wishlist.objects.get_or_create(
            user=user
        )
        if not product.is_active:
            raise ValidationError("This product is not available.")
        item, created = WishlistItem.objects.get_or_create(
            wishlist=wishlist,
            product=product
        )
        if not created:
            raise ValidationError("Product already exists in wishlist.")
        return item
    
    @staticmethod
    def remove_from_wishlist(user, product):

        try:
            wishlist = Wishlist.objects.get(
                user=user
            )

        except Wishlist.DoesNotExist:

            raise ValidationError("Wishlist does not exist.")
        try:

            item = WishlistItem.objects.get(
                wishlist=wishlist,
                product=product
            )
        except WishlistItem.DoesNotExist:

            raise ValidationError("Product is not in wishlist.")
        item.delete()
        return True

    @staticmethod
    def get_wishlist(user):

        wishlist, created = Wishlist.objects.get_or_create(
            user=user
        )
        return wishlist


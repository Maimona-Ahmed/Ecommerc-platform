from django.db import models

class Wishlist(models.Model):

    user = models.OneToOneField("accounts.User",on_delete=models.CASCADE,related_name="wishlist")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f"{self.user}'s Wishlist"

class WishlistItem(models.Model):

    wishlist = models.ForeignKey(Wishlist,on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey("products.Product", on_delete=models.CASCADE,related_name="wishlist_items")
    created_at = models.DateTimeField( auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["wishlist", "product"],
                name="unique_wishlist_product"
            )
        ]

    def __str__(self):
        return f"{self.product.name} - {self.wishlist.user}"


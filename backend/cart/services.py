from .models import Cart,CartItem
from rest_framework.exceptions import ValidationError
class CartService:
    @staticmethod
    def add_to_cart(user,variant,quantity=1):
        if quantity <= 0:
            raise ValidationError("Quantity must be greated than zero")
        if variant.stock <=0:
            raise ValidationError("This Product is out of stock")
        if quantity > variant.stock:
            raise ValidationError("Requested quantity exceeds available stock")
        cart,created = Cart.objects.get_or_create(user=user)
        cart_item,created =CartItem.objects.get_or_create(cart=cart,variant=variant,defaults={"quantity":quantity})
        if not created:
            new_quantity = (cart_item.quantity + quantity)
            if new_quantity > variant.stock:
                raise ValidationError(" new quantity exceeds available stock")
            cart_item.quantity+=quantity
            cart_item.save(update_fields=["quantity","updated_at"])
        return cart_item
    @staticmethod
    def get_cart(user):
        cart = Cart.objects.filter(user=user).prefetch_related("items").first()
        return cart
    
    @staticmethod
    def update_cart_item(user,item_id,quantity):
        if quantity <= 0:
            raise ValidationError("Quantity must be greated than zero")
        cart_item = CartItem.objects.filter(id=item_id,cart__user=user).select_related("variant").first()
        if not cart_item:
            raise ValidationError("Cart item not found")
        if quantity > cart_item.variant.stock:
            raise ValidationError("Requested quantity exceeds available stock")
        cart_item.quantity=quantity
        cart_item.save(update_fields=["quantity","updated_at"])
        return cart_item
    
    @staticmethod
    def delete_cart_item(user,item_id):
        cart_item = CartItem.objects.filter(id=item_id,cart__user=user).first()
        if not cart_item:
            raise ValidationError("Cart item not found")
        cart_item.delete()
        return True
    
    
        
        
    
        
    
    

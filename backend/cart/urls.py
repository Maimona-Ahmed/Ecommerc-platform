from django.urls import path
from .views import *

urlpatterns = [
    path("items/",AddToCartView.as_view(),name="add-to-cart"),
    path("",CartView.as_view(),name="cart"),
    path("items/<int:item_id>/",CartItemView.as_view(),name="cart-item")

]
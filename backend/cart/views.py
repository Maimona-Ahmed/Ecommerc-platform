from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from products.models import ProductVariant
from .serializers import CartItemSerializer,CartSerializer
from .services import CartService

class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        variant_id = request.data.get("variant_id")
        quantity = request.data.get("quantity")
        if not variant_id:
            return Response({"error":"variant_id is required"},status=status.HTTP_400_BAD_REQUEST)
        
        try:
            variant = ProductVariant.objects.get(id=variant_id)
        except ProductVariant.DoesNotExist:
            return Response({"error":"Product not found"},status=status.HTTP_404_NOT_FOUND)
        
        try:
            cart_item = CartService.add_to_cart(user=request.user,variant=variant,quantity=int(quantity))
        except Exception as e:
            return Response({"error":str(e)},status=status.HTTP_400_BAD_REQUEST)
        
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data,status=status.HTTP_201_CREATED)
    
class CartView(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        cart = CartService.get_cart(user = request.user)
        if not cart:
            return Response({"message":"Cart is empty","items":[]},status=status.HTTP_200_OK)
        serializer = CartSerializer(cart)
        return Response(serializer.data,status=status.HTTP_200_OK)

class CartItemView(APIView):
    permission_classes = [IsAuthenticated]
    def patch(self,request,item_id):
        quantity = request.data.get("quantity")
        if quantity is None:
            return Response({"error":"quantity is required"},status=status.HTTP_400_BAD_REQUEST)
        try:
            quantity=int(quantity)
        except (TypeError,ValueError):
            return Response({"error":"quantity must be an integer"},status=status.HTTP_400_BAD_REQUEST)
        try:
            cart_item = CartService.update_cart_item(user =request.user,item_id=item_id,quantity=quantity)
        except Exception as e:
            return Response({"error":str(e)},status=status.HTTP_400_BAD_REQUEST)
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def delete(self,request,item_id):
        try:
            CartService.delete_cart_item(user=request.user,item_id=item_id)
        except Exception as e:
            return Response({"error":str(e)},status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_204_NO_CONTENT)



    


        

        

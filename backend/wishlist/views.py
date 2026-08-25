
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from products.models import Product

from .serializers import WishlistSerializer
from .services import WishlistService


class WishlistView(APIView):

    permission_classes = [IsAuthenticated]
    def get(self, request):

        wishlist = WishlistService.get_wishlist( user=request.user)
        serializer = WishlistSerializer( wishlist )
        return Response( serializer.data, status=status.HTTP_200_OK )

    def post(self, request):

        product_id = request.data.get("product_id")

        if not product_id:
            return Response({"error": "product_id is required"}, status=status.HTTP_400_BAD_REQUEST )
        try:
            product = Product.objects.get( id=product_id)
        except Product.DoesNotExist:

            return Response( {"error": "Product not found"  },  status=status.HTTP_404_NOT_FOUND )

        try:

            item = WishlistService.add_to_wishlist( user=request.user, product=product )

        except Exception as e:

            return Response({ "error": str(e) }, status=status.HTTP_400_BAD_REQUEST )


        serializer = WishlistSerializer(item.wishlist )

        return Response(serializer.data,status=status.HTTP_201_CREATED )

    def delete(self, request):

        product_id = request.data.get( "product_id"  )

        if not product_id:

            return Response({"error": "product_id is required"},status=status.HTTP_400_BAD_REQUEST  )

        try:

            product = Product.objects.get(  id=product_id )

        except Product.DoesNotExist:

            return Response({"error": "Product not found" }, status=status.HTTP_404_NOT_FOUND  )


        try:

            WishlistService.remove_from_wishlist(user=request.user,   product=product )

        except Exception as e:

            return Response({ "error": str(e) }, status=status.HTTP_400_BAD_REQUEST )
        return Response({"message": "Product removed from wishlist." }, status=status.HTTP_200_OK)


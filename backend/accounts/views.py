from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer,LoginSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class RegisterView(generics.CreateAPIView):
    serializer_class=RegisterSerializer
    permission_classes=[AllowAny]

class LoginView(TokenObtainPairView):
    serializer_class=LoginSerializer
    permission_classes=[AllowAny]

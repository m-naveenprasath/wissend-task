from django.shortcuts import render
from rest_framework import viewsets
from .models import Task, User
from rest_framework.permissions import IsAuthenticated, BasePermission   
from rest_framework import generics
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer, TaskSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.permissions import IsAuthenticated, BasePermission


class IsAppAdmin(BasePermission):
    """
    Custom permission to allow access only to admin users.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.is_admin


class MyTokenObtainPairView(TokenObtainPairView):
    """
    Custom token view using MyTokenObtainPairSerializer.
    """
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    """
    API view to register a new user.
    """
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class CurrentUserView(APIView):
    """
    Returns current authenticated user's data.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            serializer = UserSerializer(request.user)
            return Response(serializer.data)
        except Exception as e:
            raise ValidationError(str(e))



# Create your views here.
class TaskViewSet(viewsets.ModelViewSet):
    "task crud operations this is model view set"
    permission_classes = [IsAuthenticated]
    queryset = Task.objects.all()
    serializer_class = TaskSerializer




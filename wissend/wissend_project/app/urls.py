from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet,RegisterView, CurrentUserView


router = DefaultRouter()
router.register(r'tasks',TaskViewSet, basename='task')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('user/me/', CurrentUserView.as_view(), name='current_user'),
    path('', include(router.urls)),
]
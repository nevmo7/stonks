from django.urls import path
from .views import IsAuthenticated, LogOut, SignUpView, LoginView

urlpatterns = [
    path('signup', SignUpView.as_view()),
    path('login', LoginView.as_view()),
    path('is_authenticated', IsAuthenticated.as_view()),
    path('log_out', LogOut.as_view()),
]

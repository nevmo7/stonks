from django.urls import path
from .views import index
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', index),
    path('login', index),
    path('signup', index),
    path('dashboard', index),
    path('wallet', index),
    path('stock/<str:symbol>', index),
    path('watchlist', index),
    path('ranking', index),
    path('settings', index),
    path('reset-pass', auth_views.PasswordResetView.as_view(template_name = '../templates/frontend/index.html'), name='password_reset')
]

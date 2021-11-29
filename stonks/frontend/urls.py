from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('login', index),
    path('signup', index),
    path('dashboard', index),
    path('wallet', index),
    path('stock/<str:symbol>', index),
    path('watchlist', index)
]

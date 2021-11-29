from rest_framework import serializers
from .models import *

class WatchlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watchlist
        fields = ("stock_ticker")
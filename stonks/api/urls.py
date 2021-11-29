from django.urls import path
from .views import *

urlpatterns = [
    path('signup', SignUpView.as_view(), name="signup"),
    path('login', LoginView.as_view(), name="login"),
    path('is_authenticated', IsAuthenticated.as_view(), name="is_authenticated"),
    path('log_out', LogOut.as_view(), name="logout"),
    path('add_funds', AddBuyingPower.as_view(), name="add_funds"),
    path('get_funds', GetBuyingPower.as_view(), name="get_funds"),
    path('withdraw_funds', WithdrawBuyingPower.as_view(), name="withdraw_funds"),
    path('add_to_watchlist', AddToWatchlist.as_view(), name="add_to_watchlist"),
    path('check_watchlist/<str:symbol>', CheckInWatchList.as_view(), name="check_watchlist"),
    path('remove_from_watchlist', RemoveFromWatchlist.as_view(), name="remove_from_watchlist"),
    path('get_watchlist', GetWatchlist.as_view(), name="get_watchlist"),
    path('buy_stock', BuyStock.as_view(), name="buy_stock"),
    path('sell_stock', SellStock.as_view(), name="sell_stock"),
    path('get_positions', GetPositions.as_view(), name="get_positions")
]

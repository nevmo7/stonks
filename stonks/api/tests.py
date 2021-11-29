from django.contrib import auth
from django.test import TestCase, Client
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse, resolve
from api.views import *
from api.models import *
from api.models import UserManager

# Create your tests here.
class URLTest(TestCase):
    def test_signup_url(self):
        url = reverse("signup")
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, SignUpView)

    def test_login_url(self):
        url = reverse("login")
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, LoginView)

    def test_is_authenticated_url(self):
        url = reverse("is_authenticated")
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, IsAuthenticated)

    def test_logout_url(self):
        url = reverse("logout")
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, LogOut)

    def test_add_funds(self):
        url = reverse("add_funds")
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, AddBuyingPower)

    def test_get_funds(self):
        url = reverse("get_funds")
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, GetBuyingPower)

    def test_withdraw_funds(self):
        url = reverse("withdraw_funds")
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, WithdrawBuyingPower)
    
    def test_add_to_watchlist(self):
        url = reverse("add_to_watchlist")
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, AddToWatchlist)

    def test_check_watchlist(self):
        url = reverse("check_watchlist", args=["AAPL"])
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, CheckInWatchList)

    def test_remove_from_watchlist(self):
        url = reverse("remove_from_watchlist")
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, RemoveFromWatchlist)

    def test_get_watchlist(self):
        url = reverse("get_watchlist")
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, GetWatchlist)

    def test_buy_stock(self):
        url = reverse("buy_stock")
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, BuyStock)

    def test_sell_stock(self):
        url = reverse("sell_stock")
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, SellStock)

    def test_get_positions(self):
        url = reverse("get_positions")
        print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, GetPositions)

class ViewsTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.signup_url = reverse('signup')
        self.login_url = reverse('login')
        self.logout_url = reverse('logout')
        self.is_authenticated_url = reverse('is_authenticated')


    def test_signup_user(self):
        response = self.client.post(self.signup_url, {
            'username' : 'manishrestha',
            'email' : 'manishrestha@gmail.com',
            'password' : 'Manish123'
        })

        self.assertEquals(response.status_code, 200)

    def test_is_authenticated_user(self):
        response = self.client.get(self.is_authenticated_url)

        self.assertEquals(response.status_code, 400)

    def test_login_user(self):

        response = self.client.post(self.login_url, {
            'username' : 'manishi',
            'password' : 'Manish123'
        })

        self.assertEquals(response.status_code, 400)

    def test_logout_user(self):
        response = self.client.get(self.logout_url)

        self.assertEquals(response.status_code, 200)
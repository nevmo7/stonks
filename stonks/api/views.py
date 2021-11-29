from django.contrib.auth import authenticate, login, logout
from api.models import BuyingPower, Portfolio, User, Watchlist
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core import serializers
from .utils import getPortfolioPrice, getWatchlistPrice

# Create your views here.
class SignUpView(APIView):
    def post(self, request, format=None):
        try: 
            username = request.data.get('username')
            email = request.data.get('email')
            password = request.data.get('password')

            user = User.objects.create_user(username, email, password)

            user.save()
            return Response({"Success": "User successfully created"}, status=status.HTTP_200_OK)

        except ValueError as e:
            return Response({"Error" : str(e)}, status=status.HTTP_400_BAD_REQUEST)

        
class LoginView(APIView):
    def post(self, request, format=None):
        user = authenticate(request,username=request.data.get('username'), password=request.data.get('password'))
        if user is not None:
            login(request, user)
            return Response({"Success": "User logged in!"}, status=status.HTTP_200_OK)
        else:
            return Response({"Error": "Please enter a valid email and password"}, status=status.HTTP_400_BAD_REQUEST)

class LogOut(APIView):
    def get(self, request, format=None):
        logout(request)
        return Response({"Logged out"}, status=status.HTTP_200_OK)

class IsAuthenticated(APIView):
    def get(self, request, format=None):
        # user = authenticate(username=request.data.get('username'), password=request.data.get('password'))

        if request.user.is_authenticated:
            return Response({"Success": request.user.is_authenticated}, status=status.HTTP_200_OK)
        else:
            return Response({"Error": request.user.is_authenticated}, status=status.HTTP_400_BAD_REQUEST)

class AddBuyingPower(APIView):
    def post(self, request, format=None):
        if request.user.is_authenticated:
            user_id = request.user
            available_funds = BuyingPower.objects.get(user_id=user_id).amount
            update_fund = available_funds + float(request.data.get('amount'))
            add_amount_status = BuyingPower.objects.filter(user_id=user_id).update(amount=update_fund)
            print(add_amount_status)
            return Response({"Success": "Successfully added funds"}, status=status.HTTP_200_OK)

        else:
            return Response({"Error": "Please login before adding funds"}, status=status.HTTP_400_BAD_REQUEST)

class WithdrawBuyingPower(APIView):
    def post(self, request, format=None):
        if request.user.is_authenticated:
            user_id = request.user
            available_funds = BuyingPower.objects.get(user_id=user_id).amount
            update_fund = available_funds - float(request.data.get('amount'))
            add_amount_status = BuyingPower.objects.filter(user_id=user_id).update(amount=update_fund)
            print(add_amount_status)
            return Response({"Success": "Withdrawl successful"}, status=status.HTTP_200_OK)

        else:
            return Response({"Error": "Please login before withdrawing funds"}, status=status.HTTP_400_BAD_REQUEST)

class GetBuyingPower(APIView):
    def get(self, request, format=None):
        if request.user.is_authenticated:
            user_id = request.user
            available_funds = BuyingPower.objects.get(user_id=user_id).amount
            print(available_funds)
            return Response({"Success": available_funds}, status=status.HTTP_200_OK)

        else:
            return Response({"Error": "Please login to display funds"}, status=status.HTTP_400_BAD_REQUEST)


class AddToWatchlist(APIView):
    def post(self, request, format=None):
        if request.user.is_authenticated:
            user = request.user
            ticker = request.data.get('symbol')

            inWatchlist = Watchlist.objects.filter(user=user, stock_ticker = ticker)
            if(inWatchlist):
                return Response({"Error": "Ticker is already in watchlist"}, status=status.HTTP_403_FORBIDDEN)
            else:
                watchlist = Watchlist(user = user, stock_ticker = ticker)
                watchlist.save()

                return Response({"Success": "Successfully added to watchlist"})

        else:
            return Response({"Error": "Please login before attempting to add to watchlist"}, status=status.HTTP_401_UNAUTHORIZED)

class CheckInWatchList(APIView):
    def get(self, request, symbol, format=None):

        if request.user.is_authenticated:
            inWatchlist = Watchlist.objects.filter(user=request.user, stock_ticker = symbol)

            if(inWatchlist):
                print(inWatchlist)
                return Response({"Success": True}, status=status.HTTP_200_OK)

            else:
                return Response({"Success": False}, status=status.HTTP_200_OK)
        else:
            return Response({"Error": "Please login before attempting to edit watchlist"}, status=status.HTTP_401_UNAUTHORIZED)
            

class RemoveFromWatchlist(APIView):
    def post(self, request, format=None):
        if request.user.is_authenticated:
            user = request.user
            ticker = request.data.get('symbol')

            remove_watchlist_instance = Watchlist.objects.filter(user=user, stock_ticker=ticker)

            if(remove_watchlist_instance):
                remove_watchlist_instance.delete()
                return Response({"Success": "Successfully removed from watchlist"}, status=status.HTTP_200_OK)
            else:
                return Response({"Error": "Does not exist"}, status=status.HTTP_404_NOT_FOUND)

        else:
            return Response({"Error": "Please login before attempting to edit watchlist"}, status=status.HTTP_401_UNAUTHORIZED)

class GetWatchlist(APIView):
    def get(self, request, format=None):
        if request.user.is_authenticated:
            user = request.user
            watchlist = Watchlist.objects.filter(user=user).values("stock_ticker").distinct()

            watchlistWithPrice = getWatchlistPrice(watchlist = watchlist)
            return Response(watchlistWithPrice, status=status.HTTP_200_OK)

        else:
            return Response({"Error": "Please login before attempting to edit watchlist"}, status=status.HTTP_401_UNAUTHORIZED)

class BuyStock(APIView):
    def post(self, request, format=None):
        user = request.user
        buyPrice = request.data.get('buy_price')
        units = request.data.get('units')
        ticker= request.data.get('ticker')

        existing_holding = Portfolio.objects.filter(user=user, stock_ticker = ticker)
        if(existing_holding):
            existing_buy_price = existing_holding.first().buy_price
            existing_units = existing_holding.first().units
            new_units = units + existing_units
            new_buy_price = round(((existing_buy_price * existing_units) + (units * buyPrice)) / new_units, 2)
            new_holding_status = existing_holding.update(buy_price = new_buy_price, units = new_units)

            available_funds = BuyingPower.objects.get(user=user).amount
            update_fund = available_funds - (buyPrice * units)
            add_amount_status = BuyingPower.objects.filter(user=user).update(amount=update_fund)

            print(new_holding_status)
            return Response({"Success": "Successfully bought " + str(units) + "@" + str(buyPrice)}, status=status.HTTP_200_OK)
        else:
            portfolio = Portfolio(user = user, buy_price = buyPrice, units = units, stock_ticker = ticker)
            portfolio.save()
            return Response({"Success": "Successfully bought " + str(units) + "@" + str(buyPrice)}, status=status.HTTP_200_OK)

class SellStock(APIView):
    def post(self, request, format=None):
        user = request.user
        sellPrice = request.data.get('sell_price')
        units = request.data.get('units')
        ticker= request.data.get('ticker')

        portfolio_instance = Portfolio.objects.filter(user=user, stock_ticker = ticker)
        if portfolio_instance:
            existing_units = portfolio_instance.first().units
            if existing_units == units:
                portfolio_instance.delete()
                return Response({"Success": "Successfully deleted"}, status=status.HTTP_200_OK)
            elif existing_units < units:
                return Response({"Error": "Not enough shares to sell"}, status=status.HTTP_409_CONFLICT)
            else:
                new_units = existing_units - units
                portfolio_instance.update(units=new_units)

                available_funds = BuyingPower.objects.get(user=user).amount
                update_fund = available_funds + (sellPrice * units)
                add_amount_status = BuyingPower.objects.filter(user=user).update(amount=update_fund)
                
                return Response({"Success": "Successfully sold"})

            
        else:
            return Response({"Error": "Deletion failed"}, status=status.HTTP_200_OK)


class GetPositions(APIView):
    def get(self, request, format=None):
        user = request.user

        user_portfolio_instance = Portfolio.objects.filter(user=user).values("stock_ticker", "units", "buy_price")

        if user_portfolio_instance:
            portfolioWithPrice = getPortfolioPrice(user_portfolio_instance)
            return Response(portfolioWithPrice, status=status.HTTP_200_OK)
            
        else:
            return Response({"Not Found": "The user doesn't have any open positions"}, status=status.HTTP_404_NOT_FOUND)

        
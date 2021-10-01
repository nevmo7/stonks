from django.contrib.auth import authenticate, login, logout
from api.models import BuyingPower, User
from django.shortcuts import render
from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response

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

class GetBuyingPower(APIView):
    def getBuyingPower(self, request, format=None):
        buying_power = BuyingPower().__str__
        return Response({buying_power}, status=status.HTTP_200_OK)
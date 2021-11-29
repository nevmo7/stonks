from django.urls import path
from .views import *

urlpatterns = [
    path('get-stock/<str:symbol>', GetStock.as_view()),
    path('search/<str:symbol>', SearchResult.as_view()),
    path('get-chart/<str:symbol>', GetChartData.as_view()),
    path('get-profile/<str:symbol>', GetProfile.as_view()),
    path('get-news/<str:symbol>', GetNews.as_view()),
    path('get-news-highlights', GetHighlights.as_view()),
    path('get-top-gainers', GetTopGainers.as_view()),
    path('get-top-losers', GetTopLosers.as_view())
]

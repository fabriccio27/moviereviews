from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views


urlpatterns = [
    path("movies/", views.MovieList.as_view()),
    path("movies/<int:id>/", views.MovieDetail.as_view()),
    path("movies/<int:id>/ratings/", views.RatingList.as_view()),
    path("users/register/", views.register),
    path("users/<int:id>/watchlist/", views.WatchlistView.as_view()),
    path('api-token-auth/', views.CustomAuthToken.as_view()), #esta ruta no acepta GET, pues paso username y password
]
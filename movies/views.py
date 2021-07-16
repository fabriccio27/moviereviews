from django.shortcuts import render
from rest_framework import generics
#from django.views.generic import ListView

from .models import Movie
from .serializers import MovieSerializer
# Create your views here.

class MovieList(generics.ListCreateAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

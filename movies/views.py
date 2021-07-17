from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
#from django.views.generic import ListView

from .models import Movie
from .serializers import MovieSerializer
# Create your views here.

class MovieList(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = (IsAuthenticated,)

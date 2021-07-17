from django.conf import settings
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, BasePermission, IsAuthenticatedOrReadOnly, SAFE_METHODS
from rest_framework.response import Response
from rest_framework.decorators import api_view

#from django.views.generic import ListView

from .models import Movie
from .serializers import MovieSerializer, RegistrationSerializer
# Create your views here.

class MovieList(generics.ListAPIView):
    #aca deberia poner algo para que me calcule average rating de cada pelicula o en el serializer
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    #permission_classes = (IsAuthenticated,)


#podria poner ListCreateAPIView si no hubiera diferencia de permisos, o no?

class MovieCreate(generics.CreateAPIView):
    #no acepta si no manda header con token, esta bien
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = (IsAuthenticated,)

class RatingCreate(generics.CreateAPIView):
    pass


@api_view(["POST"])
def register(request):
    serializer = RegistrationSerializer(data=request.data)
    #parece que esta andando bien, no acepta cosa que no sea request POST
    data = {}
    if serializer.is_valid():
        user = serializer.save() #por el override que hice, esto devuelve instancia de user
        data["response"] = "Succesfully registered new user."
        data["username"] = user.username
        data["email"] = user.email
    else:
        data = serializer.errors
    return Response(data)



class IsOwnerOrReadOnly(BasePermission):
    #cuando yo veo una sola request, en realidad esta haciendo todas
    # pero anda bien, me deja GET y DELETE solo me deja si coincide created_by y token de user
    def has_object_permission(self, request, view, obj):
    
        if request.method in SAFE_METHODS:
            return True   
        return obj.created_by == request.user

class MovieDetail(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = "id"
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    # estoy pidiendo autenticacion para get, delete y put. Me sugiere que use custom class para permisos

    permission_classes = (IsOwnerOrReadOnly,)



        
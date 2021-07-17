from django.conf import settings
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, BasePermission, IsAuthenticatedOrReadOnly, SAFE_METHODS
from rest_framework.response import Response
from rest_framework.decorators import api_view

#from django.views.generic import ListView

from .models import Movie
from .serializers import MovieSerializer, RegistrationSerializer
from .permissions import IsOwnerOrReadOnly

# Create your views here.

class MovieList(generics.ListCreateAPIView):
    #aca deberia poner algo para que me calcule average rating de cada pelicula o en el serializer
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    # https://www.django-rest-framework.org/tutorial/4-authentication-and-permissions/#associating-snippets-with-users
    # quiero que cuando cree una Movie me la relacione con el usuario que hizo solicitud
    # esto es un override, le pasa al serializer este argumento extra, y en el serializer le agrega un campo a lo que escribe a db
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


@api_view(["POST"])
def movie_create(request):
    serializer = MovieSerializer(data=request.data)
    print(request.user) #devuelve negro, 
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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


class MovieDetail(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = "id"
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    # estoy pidiendo autenticacion para get, delete y put. Me sugiere que use custom class para permisos

    permission_classes = (IsOwnerOrReadOnly,)



        
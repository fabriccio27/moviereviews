from django.conf import settings
from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, BasePermission, IsAuthenticatedOrReadOnly, SAFE_METHODS
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
#from django.views.generic import ListView

from .models import Movie, Rating
from .serializers import MovieSerializer, RegistrationSerializer, RatingSerializer
from .permissions import IsOwnerOrReadOnly

# Create your views here.

class MovieList(generics.ListCreateAPIView):
    #aca deberia poner algo para que me calcule average rating de cada pelicula o en el serializer
    queryset = Movie.objects.all()#.order_by('release')
    serializer_class = MovieSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    
    # https://www.django-rest-framework.org/tutorial/4-authentication-and-permissions/#associating-snippets-with-users
    # quiero que cuando cree una Movie me la relacione con el usuario que hizo solicitud
    # esto es un override, le pasa al serializer este argumento extra, y en el serializer le agrega un campo a lo que escribe a db
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class WatchlistView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    User = get_user_model()
    def get(self, request, id, format=None):
        
        user = get_object_or_404(self.User, id=id)
        wl = user.watchlist_set.first()
        movies = wl.movie.all()
        if movies.exists():
            #serializer.is_valid() lo uso cuando mando data externa tipo json, esto ya esta en db
            serializer = MovieSerializer(movies, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({"message":"No movies in watchlist for this user"}, status=status.HTTP_400_BAD_REQUEST)
        
    def post(self, request, id, format=None):
        # necesito data de pelicula, que viene en request y necesito recuperar watchlist de usuario con id que pase de arg en url
        # capaz hay una manera mas elegante que esta
        user = get_object_or_404(self.User, id=id)
        wl = user.watchlist_set.first()
        """ print(request.user) #da nombre de usuario
        print(request.data) #da movie_id:x """
        mv = Movie.objects.get(id=request.data.get('movie_id')) # print(f"id of movie you're trying to add: {request.data.get('movie_id')}")
        
        if mv in wl.movie.all():
            return Response({"message":"Movie already in in watchlist"}, status=status.HTTP_204_NO_CONTENT)

        wl.movie.add(mv)
        wl.save()
        return Response({"success":"Successfully added movie to watchlist"}, status=status.HTTP_200_OK)
    
    """ cuando alguien quiere borrar una pelicula de la watchlist que hago, DELETE o PUT? creo que PUT """
    def put(self, request, id, format=None):
        print("someone made a put request to trim watchlist")
        user = get_object_or_404(self.User, id=id)
        wl = user.watchlist_set.first()
        mv = Movie.objects.get(id=request.data.get('movie_id'))
        if mv in wl.movie.all():
            wl.movie.remove(mv)
            wl.save()
            return Response({"success":"Successfully removed movie from watchlist"}, status=status.HTTP_200_OK)
        else:
            return Response({"message":"Movie is not in the watchlist"}, status=status.HTTP_204_NO_CONTENT)
        


class RatingList(APIView):
    
    permission_classes = (IsAuthenticatedOrReadOnly,) #esta andando bien, no me deja hacer post sin token
    #aca tengo que filtrar por el id de la pelicula, como accedo? bajo un nivel de abstraccion y defino yo
    def get(self, request, id, format=None):
        ratings = Rating.objects.filter(movie=id)
        # aca deberia manejar que pasa si el qs esta vacio
        if ratings.exists():
            serializer = RatingSerializer(ratings, many=True)
            #print(serializer.data)
            return Response(serializer.data)
        else:
            return Response({"message":"No movie with requested id"}, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, id, format=None):
        serializer = RatingSerializer(data=request.data)
        movie = Movie.objects.get(id=id)
        if serializer.is_valid():
            serializer.save(user=self.request.user, movie=movie)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        status_code = status.HTTP_201_CREATED
    else:
        data = serializer.errors
        status_code = status.HTTP_400_BAD_REQUEST
    return Response(data, status=status_code)


class MovieDetail(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = "id"
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    # estoy pidiendo autenticacion para get, delete y put. Me sugiere que use custom class para permisos

    permission_classes = (IsOwnerOrReadOnly,)


from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        # usar serializer para data 
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_info':{
                'user_id': user.pk,
                'username':user.username,
                'email': user.email
            }
            
        })

""" @api_view(["POST"])
def movie_create(request):
    serializer = MovieSerializer(data=request.data)
    print(request.user) #devuelve negro, 
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) """
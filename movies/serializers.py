from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Movie, Rating


User = get_user_model()

class MovieSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField("get_average_rating")
    created_by = serializers.ReadOnlyField(source='created_by.id')

    def get_average_rating(self, obj):
        #aca deberia recuperar todos los ratings que tiene esta pelicula y elaborar
        #puedo usar ratings porque lo setee como related name
        ratings_qs = obj.ratings.all()
        if not ratings_qs.exists():
            return 0

        acum = 0
        for r in ratings_qs:
            acum += r.rating
        avg = acum/len(ratings_qs)
        return f"{round(avg,2)}"
               
    class Meta:
        model = Movie
        fields = ["id", "title", "release", "genre", "plot", "average_rating", "created_by"]


class RatingSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')
    #aca me decia que tengo que pasar una instancia de movie y yo estoy pasando un numero. 
    # En todo caso, deberia pasar la instancia y aca de la instancia usar el id, que es un numero
    movie = serializers.ReadOnlyField(source="movie.id")

    class Meta:
        model = Rating
        fields = "__all__"
        """ extra_kwargs = {"comment":{"error_messages":{"required":"You must write a valid review."}}} """


""" class LoginSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ["username", "password"] """


class RegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(max_length=20)
    class Meta:
        model = User
        fields = ["username", "email", "password", "password2"]

    def save(self):
        #esto es parecido a cleaned_data
        password = self.validated_data.get("password")
        password2 = self.validated_data.get("password2")
        
        if password != password2:
            raise serializers.ValidationError({"error": "Passwords must match."})

        username = self.validated_data.get("username")
        email = self.validated_data.get("email")

        user = User.objects.create_user(username=username, email=email, password=password)
        # https://docs.djangoproject.com/en/3.2/ref/contrib/auth/#django.contrib.auth.models.UserManager.create_user
        return user
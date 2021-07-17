from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Movie


User = get_user_model()

class MovieSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField("get_average_rating")

    def get_average_rating(self, obj):
        #aca deberia recuperar todos los ratings que tiene esta pelicula y elaborar
        #puedo usar ratings porque lo setee como related name
        ratings_qs = obj.ratings.all()
        if not ratings_qs.exists():
            return 0

        acum = 0
        for r in ratings_qs:
            acum += r.rating
        return acum/len(ratings_qs)
               
    class Meta:
        model = Movie
        fields = ["title", "release", "genre", "plot", "average_rating"]
    


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
from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your models here.
class Movie(models.Model):
    title = models.CharField(max_length=220)
    release = models.DateField(auto_now_add=False, null=True, blank=True)
    genre = models.CharField(max_length=120)
    plot = models.CharField(max_length=300)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) #esto hace que en tabla de movies aparezca columna created_by_id

    def __str__(self):
        return self.title


""" para acceder a una de estas tengo que hacer user_instance.watchlist_set.first() y me devuelve la instancia de watchlist
si a la instancia de watchlist le hago .movie, me dice que tengo un manager, entonces con wl_instance.movie.all() obtengo las instancias de peliculas
puedo agregar instancias de Movie a wl haciendo wl_instance.movie.add(movieinstance). Tengo que guardar porque es una modificacion no hecha por create
awl.save() """
class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) # esto no deberia ser OneToOne??
    movie = models.ManyToManyField(Movie)

    def __str__(self):
        return f"{self.user.username}'s watchlist"

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.CharField(max_length=500)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="ratings")

    def __str__(self):
        return f"{self.user.username} rated with {self.rating} {self.movie.title}"


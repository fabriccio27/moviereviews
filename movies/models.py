from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your models here.
class Movie(models.Model):
    title = models.CharField(max_length=220)
    release = models.DateField(auto_now_add=False, null=True, blank=True)
    genre = models.CharField(max_length=120)
    plot = models.CharField(max_length=300)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.title


class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.CharField(max_length=500)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, related_name="ratings")


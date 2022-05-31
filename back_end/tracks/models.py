from django.db import models
from django.contrib.auth.models import User

class Album(models.Model):
    name = models.CharField(max_length=250)
    release_date = models.DateField(null=True, blank=True)
    genre = models.CharField(max_length=50)
    cover = models.ImageField(upload_to='covers', blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.RESTRICT, default=1)

    def __str__(self):
        return self.name


class Artist(models.Model):
    name = models.CharField(max_length=250)
    is_verified = models.BooleanField(default=False)
    about = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name


class Song(models.Model):
    title = models.CharField(max_length=250)
    duration = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    artist = models.ForeignKey(Artist, on_delete=models.RESTRICT)
    album = models.ForeignKey(Album, on_delete=models.RESTRICT)
    audio_file = models.FileField(upload_to='songs', blank=True, null=True)


    def __str__(self):
        return self.title
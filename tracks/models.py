from django.db import models


class Album(models.Model):
    name = models.CharField(max_length=250)
    release_date = models.DateField(null=True, blank=True)
    genre = models.CharField(max_length=50)

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
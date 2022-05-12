from django.urls import path

from artist import views

urlpatterns = [
    path('add/album', views.add_album),
    path('add/song', views.add_song),
    path('albums', views.albums)
]
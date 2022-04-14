import os

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

# Create your views here.
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic

from back_end import settings
from back_end.settings import BASE_DIR
from tracks.forms import AlbumForm
from tracks.models import Album


class SignUpView(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy("login")
    template_name = "registration/signup.html"


def add_album(request):
    if request.method == 'POST':
        form = AlbumForm(request.POST)
        if form.is_valid():
            album = Album()
            album.name = request.POST['name']
            album.release_date = request.POST['release_date']
            album.genre = request.POST['genre']
            album.save()
            return HttpResponse("OK")
            # redirect to a page /test/albums to display all albums
    else:
        form = AlbumForm()
    context = {'form': form}
    return render(request, "test/album_form.html", context)


def api_add_album(request):
    if request.method == 'POST':
        form = AlbumForm(request.POST)
        if form.is_valid():
            return JsonResponse({'result': 'success'})
        else:
            return JsonResponse({'result': 'error', 'errors': form.errors, 'form': form.data})


def cover(request, id):
    return JsonResponse({'cover': settings.SITE_URL + '/media/covers/' + str(id) + '.jpg'})


def song(request, id):
    song = settings.SITE_URL + '/media/songs/' + str(id) + '.mp3'
    context = {'song': song}
    return render(request, "test/song.html", context)

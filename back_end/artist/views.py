from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from artist.forms import AlbumForm
from tracks.models import Album


@login_required
def add_album(request):
    if request.method == 'POST':
        form = AlbumForm(data=request.POST, files=request.FILES)
        if form.is_valid():
            # can we resize the image to 200x200 pixels? with Pillow?
            album = form.save()
            album.user = request.user
            album.save()
            return redirect('/api/albums')
    else:
        form = AlbumForm()
    context = {'form': form}
    return render(request, 'add_album.html', context)


@login_required
def albums(request):
    albums_list = Album.objects.filter(user=request.user)
    context = {'albums': albums_list}
    return render(request, 'albums.html', context)


def add_song(request):
    pass

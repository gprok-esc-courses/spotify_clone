from django import forms

from tracks.models import Album


class AlbumForm(forms.ModelForm):
    class Meta:
        model = Album
        fields = ('name', 'release_date', 'genre', 'cover')

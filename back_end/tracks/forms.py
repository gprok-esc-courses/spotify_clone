from django import forms


class AlbumForm(forms.Form):
    name = forms.CharField(label='Name:', max_length=250)
    release_date = forms.DateField(label='Release Date:', widget=forms.SelectDateWidget())
    genre = forms.CharField(label='Genre:', max_length=50)

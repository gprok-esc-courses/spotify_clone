from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.SpotifyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('test/', views.test_api),
    path('albums/', views.all_albums),
    path('search/album/', views.search_album),
    path('search/artist/', views.search_artist),
    path('search/song/', views.search_song),
    path('song/url/<int:id>', views.song_url)
]
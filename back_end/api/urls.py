from django.urls import path
from . import views

urlpatterns = [
    path('token/', views.SpotifyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('test/', views.test_api),
    path('albums/', views.all_albums),
]
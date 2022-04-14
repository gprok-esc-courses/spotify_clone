from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework import status, generics
from api.serializer import SpotifyTokenObtainPairSerializer, RegisterSerializer
from back_end import settings
from tracks.models import Album
from django.contrib.auth.models import User
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt

class SpotifyTokenObtainPairView(TokenObtainPairView):
    serializer_class = SpotifyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def test_api(request):
    if request.method == 'POST':
        term = request.POST.get('term')
        return Response({'success': f'You send text {term}'}, status=status.HTTP_200_OK)
    elif request.method == 'GET':
        return Response({'success': 'Welcome!'}, status=status.HTTP_200_OK)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def all_albums(request):
    """
    URL: /api/albums/
    Return all albums in the database
    {'albums': [ {...}, {...}, {...} ]}
    """
    albums = Album.objects.all()
    # albums_list = serializers.serialize('json', albums)
    albums_list = list(albums.values())
    return Response({'albums': albums_list}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def search_album(request):
    if request.method == 'POST':
        term = request.POST.get('term')
        print(term)
        albums = Album.objects.filter(name__icontains=term)
        albums_list = list(albums.values())
        return Response({'albums': albums_list}, status=status.HTTP_200_OK)
    else:
        return Response({}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def search_artist(request):
    pass


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def search_song(request):
    pass


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def song_url(request, id):
    # Check if id is valid
    return Response({'url': settings.SITE_URL + '/media/songs/' + str(id) + '.mp3'}, status=status.HTTP_200_OK)

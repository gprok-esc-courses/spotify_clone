from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework import status
from api.serializer import SpotifyTokenObtainPairSerializer
from tracks.models import Album
from django.core import serializers

class SpotifyTokenObtainPairView(TokenObtainPairView):
    serializer_class = SpotifyTokenObtainPairSerializer


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



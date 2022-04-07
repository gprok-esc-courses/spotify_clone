from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class SpotifyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # add whatever else info we need in the token
        token['username'] = user.username
        token['email'] = user.email
        return token


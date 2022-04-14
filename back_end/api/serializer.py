from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password


class SpotifyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # add whatever else info we need in the token
        token['username'] = user.username
        token['email'] = user.email
        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True,
                                     required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    # email = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords didn't match"})
        return attrs

    def create(self, validated_data):
        # user = User.objects.create(username=validated_data['username'])
        user = User()
        user.username = validated_data['username']
        user.set_password(validated_data['password'])
        user.email = validated_data['email']
        user.save()

        return user


from rest_framework import generics, permissions, status
from rest_framework.response import Response

# from knox.models import AuthToken
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer


# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user_serializer = UserSerializer(user, context=self.get_serializer_context())
        # token = AuthToken.objects.create(user=user)[1]
        return Response(
            {"user": user_serializer.data}, status=201,
        )  # deal with token? Redirect to Login page


# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        user_serializer = UserSerializer(user, context=self.get_serializer_context())
        # token = AuthToken.objects.create(user=user)[1]
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "user": user_serializer.data,
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh),
            },
            status=200,
        )


# Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class LogoutAndBlacklistRefreshTokenForUserView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST, exception=str(e))

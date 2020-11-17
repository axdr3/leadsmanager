from django.urls import re_path
from accounts.api import (
    RegisterAPI,
    LoginAPI,
    UserAPI,
    LogoutAndBlacklistRefreshTokenForUserView,
)
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    re_path(r"^api/auth/register/$", RegisterAPI.as_view()),
    re_path(r"^api/auth/login/$", LoginAPI.as_view()),
    re_path(r"^api/auth/user/$", UserAPI.as_view()),
    re_path(
        r"^api/auth/token/$",
        jwt_views.TokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    re_path(
        r"^api/token/refresh/$",
        jwt_views.TokenRefreshView.as_view(),
        name="token_refresh",
    ),
    re_path(
        r"^api/token/verify/$", jwt_views.TokenVerifyView.as_view(), name="token_verify"
    ),
    re_path(
        r"^api/auth/logout/$",
        LogoutAndBlacklistRefreshTokenForUserView.as_view(),
        name="blacklist",
    ),
]

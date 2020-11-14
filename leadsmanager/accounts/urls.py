from django.urls import path, include, re_path
from accounts.api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views


urlpatterns = [
    re_path(r"^api/auth/register/$", RegisterAPI.as_view()),
    re_path(r"^api/auth/login/$", LoginAPI.as_view()),
    re_path(r"^api/auth/user/$", UserAPI.as_view()),
    re_path(r"^api/auth/logout/$", knox_views.LogoutView.as_view(), name="knox_logout"),
    path("api/auth", include("knox.urls")),
]

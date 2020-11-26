from rest_framework import routers

# from django.urls import path, re_path
from .api import LeadViewSet

router = routers.DefaultRouter()
router.register("api/leads", LeadViewSet, "leads")
# re_path("$api/leads/", LeadViewSet, "leads")

urlpatterns = router.urls

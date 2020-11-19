from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()
# Create your models here.


class Lead(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50, unique=True)
    message = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(
        User, related_name="leads", on_delete=models.CASCADE, null=True
    )

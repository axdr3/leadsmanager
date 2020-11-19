from rest_framework import serializers
from leads.models import Lead

# Lead Serializer


class LeadSerializer(serializers.ModelSerializer):
    # owner = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Lead
        fields = "__all__"


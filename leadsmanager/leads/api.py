from rest_framework import viewsets, permissions
from .serializers import LeadSerializer

# Lead Viewset


class LeadViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = LeadSerializer

    # queryset = Lead.objects.all()
    def get_queryset(self):
        return self.request.user.leads.all()

    def perform_create(self, serializer):
        print(serializer.validated_data)
        serializer.save(owner=self.request.user)

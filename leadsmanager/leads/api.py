from rest_framework import viewsets, permissions, filters
import django_filters

# from django_filters import rest_framework as filters
from .serializers import LeadSerializer

# Lead Viewset


class LeadViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = LeadSerializer
    filter_backends = [
        django_filters.rest_framework.DjangoFilterBackend,
        filters.OrderingFilter,
        filters.SearchFilter,
    ]
    filterset_fields = ["id", "name", "email"]
    # filter_queryset =
    # filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["^name", "^email"]
    ordering_fields = ["id", "name", "email"]

    # queryset = Lead.objects.all()

    def get_queryset(self):
        queryset = self.request.user.leads.all()
        queryset = self.filter_queryset(queryset)
        # if self.request.query_params:
        #     params = self.request.query_params
        #     print("id", params.get("id", None))
        return queryset

    def perform_create(self, serializer):
        # print(serializer.validated_data)
        serializer.save(owner=self.request.user)

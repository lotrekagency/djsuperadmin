from urllib.parse import urlparse

from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Content, BreadcrumbContent
from .serializers import ContentSerializer, BreadcrumbContentSerializer


class ContentViewSet(viewsets.ModelViewSet):
    queryset = Content.objects.all()
    serializer_class = ContentSerializer
    model = Content
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]


class BreadcrumbContentViewSet(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None, **kwargs):
        identifier = kwargs['identifier']
        data = BreadcrumbContent.objects.filter(identifier=identifier).order_by("position")
        return Response(BreadcrumbContentSerializer(data, many=True).data)

    def patch(self, request, *args, **kwargs):
        identifier = kwargs['identifier']
        data = request.data
        if len(data) == 0:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        BreadcrumbContent.objects.filter(identifier=identifier).delete()
        db_data = [BreadcrumbContent.objects.create(identifier=identifier,
                                                    content=item['content'],
                                                    url=urlparse(item['url']).path,
                                                    position=position) for position, item in enumerate(data)]
        return Response(BreadcrumbContentSerializer(db_data, many=True).data)




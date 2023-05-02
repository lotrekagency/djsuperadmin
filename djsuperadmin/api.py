import json

from django.http import JsonResponse
from django.views import View

from djsuperadmin.models import Content


class ContentApiView(View):
    def get_object(self, uuid):
        content, _ = Content.objects.get_or_create(id=uuid)
        return content

    def get(self, request, uuid, *args, **kwargs):
        content = self.get_object(uuid)
        return JsonResponse({"content": content.data})

    def patch(self, request, uuid, *args, **kwargs):
        content = self.get_object(uuid)
        data = json.loads(request.body)
        content_data = data["content"]
        content.data = content_data
        content.save()
        return JsonResponse({"content": content_data})

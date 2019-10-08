from .models import Content, BreadcrumbContent
from hvad.contrib.restframework import TranslatableModelSerializer


class ContentSerializer(TranslatableModelSerializer):
    class Meta:
        model = Content
        fields = '__all__'


class BreadcrumbContentSerializer(TranslatableModelSerializer):
    class Meta:
        model = BreadcrumbContent
        fields = '__all__'

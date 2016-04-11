from django.conf import settings


def use_prod_static(request):
    return {
        'USE_PROD_STATIC': settings.USE_PROD_STATIC
    }

from django.core.exceptions import PermissionDenied
from django.conf import settings


class FilterIPMiddleware(object):

    # Check if client IP is allowed
    def process_request(self, request):

        ip = request.META.get('REMOTE_ADDR') # Get client IP

        if ip not in settings.ALLOWED_IPS:
            raise PermissionDenied

        return None

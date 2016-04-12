from django.core.exceptions import PermissionDenied
from django.conf import settings


class FilterIPMiddleware(object):

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[-1].strip()
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    # Check if client IP is allowed
    def process_request(self, request):

        ip = self.get_client_ip(request)

        if ip not in settings.ALLOWED_IPS:
            raise PermissionDenied

        return None

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

        is_allowed = False

        ip = self.get_client_ip(request)
        ip = '159.54.138.10'

        for allowed_ip in settings.ALLOWED_IPS:

            if ('*' in allowed_ip and allowed_ip[:allowed_ip.rfind('*')] in ip) or allowed_ip == ip:
                is_allowed = True

        if not is_allowed:
            raise PermissionDenied

        return None

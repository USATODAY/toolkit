from models import Viz
from forms import DocumentForm
from django.middleware.csrf import get_token
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import JsonResponse
from django.core.signing import Signer
import json

signer = Signer()


def preview(request):
    return render_to_response('tables/table.html', {
        'title': 'My Table',
        'data': 'tables/data/sample.json'
    })


def editor(request):
    csrf_token = get_token(request)
    return render_to_response('tables/editor.html', {
        'csrf_token': csrf_token
    }, context_instance=RequestContext(request))


def documents_json(request):
    response = {
        'error': True,
        'message': 'Invalid Request'
    }
    token = request.GET.get('token', None)
    if token is not None:
        try:
            id = int(signer.unsign(token))
            viz = Viz.objects.get(id=id)
            response = json.loads(viz.json.file.read())
        except Exception as e:
            pass
    return JsonResponse(response)


def upload(request):
    response = {
        'error': True,
        'message': 'Request must be POST'
    }
    # Handle file upload
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            # create a new table entry
            table = Viz(file=request.FILES['file'])
            table.save()
            response = {
                'success': True,
                'token': signer.sign(table.id)
            }
        else:
            response = {
                'error': True,
                'message': form.errors['file']
            }
    return JsonResponse(response)

from models import Document
from forms import DocumentForm
from django.middleware.csrf import get_token
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import JsonResponse


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


def upload(request):
    response = {
        'error': True,
        'message': 'Request must be POST'
    }
    # Handle file upload
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            newdoc = Document(file=request.FILES['file'])
            newdoc.save()
            response = {
                'success': True,
                'id': newdoc.id
            }
        else:
            response = {
                'error': True,
                'message': form.errors['file']
            }
    return JsonResponse(response)

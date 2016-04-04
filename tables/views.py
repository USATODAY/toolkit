from models import TableViz
from forms import DocumentForm, TableVizPublish
from django.middleware.csrf import get_token
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import JsonResponse
from django.core.signing import Signer
import json

signer = Signer()


# preview table viz
def preview(request):
    return render_to_response('tables/table.html', {
        'title': 'My Table',
        'data': 'tables/data/sample.json'
    })


# editor view, requires csrf_token to call backend calls
def editor(request):
    csrf_token = get_token(request)
    return render_to_response('tables/editor.html', {
        'csrf_token': csrf_token
    }, context_instance=RequestContext(request))


# upload excel files
def media_upload(request):
    response = {
        'error': True,
        'message': 'Request must be POST'
    }
    # Handle file upload
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            # create a new table entry
            table = TableViz(file=request.FILES['file'])
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


def set_table_viz(id, data):
    table_viz = TableViz.objects.get(id=id)
    table_viz.title = data['title']
    table_viz.chatter = data['chatter']
    table_viz.source = data['source']
    table_viz.save()


def get_table_viz(id):
    table_viz = TableViz.objects.get(id=id)
    data = {
        'title': table_viz.title,
        'chatter': table_viz.chatter,
        'source': table_viz.chatter,
        'table_data': json.loads(table_viz.json.file.read())
    }
    return data


# get/set table-viz
def table_viz(request):
    response = {
        'error': True,
        'message': 'Bad request'
    }
    if request.method == 'POST':
        data = json.loads(request.body)
        form = TableVizPublish(data)
        if form.is_valid():
            id = int(signer.unsign(data['token']))
            set_table_viz(id, data)
        #     TODO publish to ftp here
        else:
            response = {
                'error': True,
                'message': 'Input data is invalid'
            }
    elif request.method == 'GET':
        token = request.GET.get('token', None)
        if token is not None:
            try:
                id = int(signer.unsign(token))
                if id is not None:
                    response = get_table_viz(id)
                    response['token'] = token
            except Exception as e:
                pass
    return JsonResponse(response)


# get publish details
def get_published(request):
    response = {
        'error': True,
        'message': 'Request must be POST'
    }
    return JsonResponse(response)

from models import TableViz
from forms import DocumentForm, TableVizPublish
from django.middleware.csrf import get_token
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import JsonResponse
from django.core.signing import Signer
from ftp_manager import upload
import json

signer = Signer()


def viewer(request):
    prod_files = request.GET.get('use_prod', None)
    deployment_files = request.GET.get('use_deployment', None)
    use_prod = prod_files == 'true'
    use_deployment = deployment_files == 'true'
    return render_to_response('tables/viewer.html', {
        'use_prod': use_prod,
        'use_deployment': use_deployment
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
        'message': 'Bad Request'
    }
    # Handle file upload
    if request.method == 'POST':
        form = DocumentForm(request.POST, request.FILES)
        if form.is_valid():
            # create a new table entry
            table = TableViz(file=request.FILES['file'])
            table.save()
            if table.id:
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


def set_table_viz_data(id, data):
    table_viz = TableViz.objects.get(id=id)
    table_viz.title = data['title']
    table_viz.chatter = data['chatter']
    table_viz.source = data['source']
    table_viz.save()
    return table_viz


def get_table_viz_data(id):
    table_viz = TableViz.objects.get(id=id)
    data = {
        'title': table_viz.title,
        'chatter': table_viz.chatter,
        'source': table_viz.source,
        'table_data': json.loads(table_viz.json.file.read())
    }
    return data


# get/set table-viz
def table_viz(request):
    response = {
        'error': True,
        'message': 'Bad request'
    }
    try:
        if request.method == 'POST':
            data = json.loads(request.body)
            id = int(signer.unsign(data['token']))
            table_viz = set_table_viz_data(id, data)
            response = get_table_viz_data(id)
            if data['publish']:
                form = TableVizPublish(data)
                if form.is_valid():
                    file_name = '%s.json' % id
                    upload(file_content=json.dumps(response), file_name=file_name)
                    table_viz.published = True
                    table_viz.save()
                else:
                    response = {
                        'error': True,
                        'message': 'Input data is invalid'
                    }
        elif request.method == 'GET':
            token = request.GET.get('token', None)
            id = request.GET.get('id', None)
            # id is in path
            if token is None and id is None and '.json' in request.path:
                id = request.path[request.path.rfind('/')+1:request.path.rfind('.json')]
            # token is provided, extract id
            if token is not None:
                id = int(signer.unsign(token))
            if id is not None:
                id = int(id)
                response = get_table_viz_data(id)
                response['token'] = token
    except Exception as e:
        pass
    return JsonResponse(response)

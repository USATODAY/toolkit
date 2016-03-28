from django.shortcuts import render, render_to_response


def preview(request):
    return render_to_response('table.html',  {
        'title': 'My Table',
        'data': 'tables/data/sample.json'
    })

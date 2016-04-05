from django.conf.urls import patterns, url
import views

urlpatterns = [
    url(r'^table-viz/$', views.table_viz, name="table-viz"),
    url(r'^upload/$', views.media_upload, name="upload"),
    url(r'^editor/.*', views.editor, name="editor"),
    url(r'^viewer.*', views.viewer, name="viewer")
]

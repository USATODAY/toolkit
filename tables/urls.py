from django.conf.urls import patterns, url
import views

urlpatterns = [
    url(r'^documents-json/$', views.documents_json, name="documents-json"),
    url(r'^table-viz/$', views.table_viz, name="table-viz"),
    url(r'^upload/$', views.media_upload, name="upload"),
    url(r'^editor/$', views.editor)
]

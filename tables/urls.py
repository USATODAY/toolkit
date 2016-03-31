from django.conf.urls import patterns, url
import views

urlpatterns = [
    url(r'^documents-json/$', views.documents_json, name="documents-json"),
    url(r'^upload/$', views.upload, name="upload"),
    url(r'^editor/$', views.editor)
]

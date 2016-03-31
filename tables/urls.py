from django.conf.urls import patterns, url
import views

urlpatterns = [
    url(r'^upload', views.upload, name="upload"),
    url(r'^editor/$', views.editor)
]

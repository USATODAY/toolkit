from django.conf.urls import patterns, url
import views

urlpatterns = [
    url(r'^list/$', views.list),
    url(r'^editor/$', views.editor)
]

from django.conf.urls import patterns, url
import views

urlpatterns = [
    url(r'^list/$', views.list, name='list')
]

from django.conf.urls import url

from base import views as base_views

urlpatterns = [
    url(r'^',
        base_views.IndexView.as_view(),
        name='index'),
]

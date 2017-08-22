import os

from django.conf import settings
from django.http import HttpResponse
from django.views.generic import View
from knox.auth import TokenAuthentication
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import requests

class IndexView(View):
    """Render main page."""
    def __init__(self):
        self.session = requests.Session()

    def get(self, request):
        """Return html for main application page."""
        path = request.path

        response = self.session.post('http://waggle:3000%s' % path)

        return HttpResponse(response.text)

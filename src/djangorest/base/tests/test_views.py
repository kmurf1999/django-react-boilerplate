from unittest import TestCase
from django.test.client import Client

from base.views import IndexView

class IndexViewTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_IndexView(self):
        # Waggle server must be running to pass
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        
        response = self.client.get('/login')
        self.assertEqual(response.status_code, 200)

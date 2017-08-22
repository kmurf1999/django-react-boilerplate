import uuid

import base64
from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from lib.testutils import CustomTestCase
from accounts.tests.test_serializers import UserRegistrationSerializerTest, UserSerializerTest
from accounts.tests.test_models import UserFactory


def get_basic_auth_header(username, password):
    return 'Basic %s' % base64.b64encode(('%s:%s' % (username, password)).encode('ascii')).decode()


class AccountTests(CustomTestCase, APITestCase):
    INVALID_DATA_DICT = [
        {'data': {'test1': 'test',
                  'password': 'teste'},
         'error': ('non_field_errors', ['Unable to login with provided credentials.']),
         'label': 'Invalid login credentials.',
         'method': 'POST',
         'status': status.HTTP_401_UNAUTHORIZED
         },
    ]
    VALID_DATA_DICT = [
        {'username': 'test', 'password': 'test'},
    ]

    def setUp(self):
        self.user = UserFactory.create(username='test')
        self.user.set_password('test')
        self.user.save()
        self.user_2 = UserFactory.create(username='test1')

    def test_account_register_unsuccessful(self):
        self.assert_invalid_data_response(invalid_data_dicts=UserRegistrationSerializerTest.INVALID_DATA_DICT,
                                          url=reverse('accounts:register'))

    def test_account_login_unsuccessful(self):
        self.client.credentials(HTTP_AUTHORIZATION=get_basic_auth_header('test', 'wrong'))
        response = self.client.post(reverse('accounts:login'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_account_register_successful(self):
        url = reverse('accounts:register')
        data = {
            'username': 'test2',
            'password': 'test2'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Confirm user can login after register
        url_login = reverse('accounts:login')
        self.client.credentials(HTTP_AUTHORIZATION=get_basic_auth_header('test2', 'test2'))
        response_login = self.client.post(url_login, format='json')
        self.assertTrue('token' in response_login.data)
        self.assertEqual(response_login.status_code, status.HTTP_200_OK)
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(response_login.data['token']))

    def test_account_register_username_already_exists(self):
        url = reverse('accounts:register')
        data = {
            'username': 'test3',
            'password': 'test'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Confirm user can login after register
        url_login = reverse('accounts:login')
        self.client.credentials(HTTP_AUTHORIZATION=get_basic_auth_header('test3', 'test'))
        response_login = self.client.post(url_login, format='json')
        self.assertTrue('token' in response_login.data)
        self.assertEqual(response_login.status_code, status.HTTP_200_OK)

        url = reverse('accounts:register')
        data = {
            'username': 'test3',
            'password': 'test'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['username'], ['user with this username already exists.'])

    def test_account_login_successful_and_perform_actions(self):
        # Ensure we can login with given credentials.
        url = reverse('accounts:login')
        self.client.credentials(HTTP_AUTHORIZATION=get_basic_auth_header('test', 'test'))
        response = self.client.post(url, format='json')
        self.assertTrue('token' in response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

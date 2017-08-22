from rest_framework import status
from rest_framework.test import APITestCase

from accounts.serializers import UserRegistrationSerializer, UserSerializer
from lib.testutils import CustomTestCase
from accounts.tests.test_models import UserFactory


class UserRegistrationSerializerTest(CustomTestCase, APITestCase):
    INVALID_DATA_DICT = [
        {'data': {'username': '',
                  'password': 'test'},
         'error': ('username', ['This field may not be blank.']),
         'label': 'username is required.',
         'method': 'POST',
         'status': status.HTTP_400_BAD_REQUEST
         },
         {'data': {'username': 'test1',
                   'password': ''},
          'error': ('password', ['This field may not be blank.']),
          'label': 'password is required.',
          'method': 'POST',
          'status': status.HTTP_400_BAD_REQUEST
          },
    ]
    VALID_DATA_DICT = [
        {'username': 'test',
         'password': 'test'},
    ]

    def setUp(self):
        self.required_fields = ['username', 'password']
        self.user = UserFactory.create()

    def test_fields(self):
        serializer = UserRegistrationSerializer()
        self.assert_fields_required(True, serializer, self.required_fields)

    def test_validate_success(self):
        serializer = UserRegistrationSerializer
        self.assert_valid_data(serializer, self.VALID_DATA_DICT)

    def test_invalid_data(self):
        serializer = UserRegistrationSerializer
        self.assert_invalid_data(serializer, self.INVALID_DATA_DICT)

class UserSerializerTest(CustomTestCase, APITestCase):
    INVALID_DATA_DICT = [
        {'data': {'username': ''},
         'error': ('username', ['This field may not be blank.']),
         'label': 'Username is required',
         'method': 'POST',
         'status': status.HTTP_400_BAD_REQUEST
         },
    ]
    VALID_DATA_DICT = [
        {'username': 'test'}
    ]

    def setUp(self):
        self.required_fields = ['username']
        self.not_required_fields = ['id']

    def test_fields(self):
        serializer = UserSerializer()
        self.assert_fields_required(True, serializer, self.required_fields)
        self.assert_fields_required(False, serializer, self.not_required_fields)
        self.assertEqual(len(serializer.fields), len(self.required_fields) + len(self.not_required_fields))

    def test_invalid_data(self):
        serializer = UserSerializer
        self.assert_invalid_data(serializer, self.INVALID_DATA_DICT)

    def test_validate_success(self):
        serializer = UserSerializer
        self.assert_valid_data(serializer, self.VALID_DATA_DICT)

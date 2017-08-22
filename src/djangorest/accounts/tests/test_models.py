import factory
from django.test import TestCase

from accounts.models import User

class UserFactory(factory.DjangoModelFactory):
    username = 'john'

    class Meta:
        model = User


class AccountsModelsTests(TestCase):
    def setUp(self):
        self.user = UserFactory.create()

    def test_unicode(self):
        self.assertEqual(str(self.user), 'john')

    def test_super_user(self):
        super_user = User.objects.create_superuser('john1')
        self.assertEqual(super_user.is_superuser, True)

    def test_user(self):
        user = User.objects.create_user(username='john2',
                                        password="test")
        self.assertEqual(user.is_superuser, False)

    def test_get_short_name(self):
        self.assertEqual(self.user.get_short_name(), 'john')

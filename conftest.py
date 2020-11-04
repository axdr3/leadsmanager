import pytest
import random
from faker import Faker
from tweets.models import Tweet
from django.contrib.auth import get_user_model

User = get_user_model()


def faker_seed():
    # fake = Faker()
    return random.randint(0, 10000)


@pytest.fixture
@pytest.mark.django_db
def faker_db_setup(request, faker):

    users = make_fake_users(faker)
    content_arr = make_tweet_contents(faker)

    for c in content_arr:
        Tweet.objects.create(content=c, user=users[random.randint(0, 8)])

    def fin():
        yield [tweet for tweet in Tweet.objects.all()]


@pytest.fixture
@pytest.mark.django_db
def predef_db_setup(request, faker):

    make_predef_users()
    content_arr = make_tweet_contents(faker)  # 25 tweets

    user = User.objects.get(username="john")
    for i in range(0, 6):  # 5 tweets for john
        Tweet.objects.create(content=content_arr[i], user=user)

    user = User.objects.get(username="monkey")
    for i in range(6, 13):  # 6 tweets for monkey
        Tweet.objects.create(content=content_arr[i], user=user)

    user = User.objects.get(username="murago")
    for i in range(13, 22):  # 8 tweets for murago
        Tweet.objects.create(content=content_arr[i], user=user)

    user = User.objects.get(username="marx")
    for i in range(22, 25):  # 3 tweets for marx
        Tweet.objects.create(content=content_arr[i], user=user)

    def fin():
        yield [tweet for tweet in Tweet.objects.all()]


@pytest.mark.django_db
def make_predef_users(count=10):

    usernames = [
        "john",
        "monkey",
        "murago",
        "peter",
        "bob",
        "karl",
        "marx",
        "jung",
        "lacan",
        "freud",
    ]
    users = []
    for username in usernames:
        users.append(User.objects.create(username=username))

    return users


@pytest.mark.django_db
def make_fake_users(faker):

    users = []

    for i in range(0, 9):
        username = faker.profile(fields="username")["username"]
        users.append(User.objects.get_or_create(username=username)[0])

    return users


def make_tweet_contents(faker, nb_texts=25, max_nb_chars=240):
    return faker.texts(nb_texts=nb_texts, max_nb_chars=max_nb_chars)

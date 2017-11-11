from __future__ import absolute_import
import time
from datetime import datetime
from celery import shared_task
from celery.schedules import crontab
from celery.task import periodic_task
from core.helpers import send_mail, send_digest
from core.models import User
from posts.models import Post
from subscriptions.models import Subscription


@shared_task
def post_liked(text, email):
    send_mail('Your post was liked!!', text, [email, ])


@periodic_task(run_every=crontab(minute='0,5,10,15,20,25,30,35,40,45,50,55'))
# @periodic_task(run_every=crontab(minute='*'))
def post_periodic():
    posts_to_report_sent = set()
    for user in User.objects.all():
        total_posts = []
        for target in Subscription.objects.filter(author=user).values_list('target', flat=True):
            posts = Post.objects.filter(report_sent=False, created__date=datetime.today().date(), author__id=target)
            if posts:
                for post in posts:
                    posts_to_report_sent.add(post)
                    total_posts.append(post)
        if total_posts:
            res = [str(post) + ': ' + str(post.text) for post in total_posts]
            send_digest('Digest for ' + user.first_name, res, [user.email, ])
    for post in posts_to_report_sent:
        post.report_sent = True
        post.save()

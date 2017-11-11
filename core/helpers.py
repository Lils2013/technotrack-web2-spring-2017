# coding=utf-8
from __future__ import print_function

from django.core.mail import EmailMultiAlternatives
from templated_email import InlineImage
from django.template.loader import render_to_string


def send_mail(subject, like, to):
    email = EmailMultiAlternatives(subject, like, 'noreply@cool.com', to)
    pic = InlineImage('spirit.jpg', open(u'C:\spirit.jpg', 'rb').read(), subtype='jpeg')
    pic.attach_to_message(email)
    html = render_to_string('emails/liked.html', {'spirit': pic, 'cool': like})
    email.attach_alternative(html, 'text/html')
    email.send()


def send_digest(subject, posts, to):
    email = EmailMultiAlternatives(subject, str(posts), 'noreply@cool.com', to)
    pic = InlineImage('spirit.jpg', open(u'C:\spirit.jpg', 'rb').read(), subtype='jpeg')
    pic.attach_to_message(email)
    html = render_to_string('emails/digest.html', {'spirit': pic, 'posts': posts})
    email.attach_alternative(html, 'text/html')
    email.send()

# coding=utf-8
from __future__ import print_function

from django.core.mail import EmailMultiAlternatives
from templated_email import InlineImage
from django.template.loader import render_to_string


def send_mail(subject, text, to):
    email = EmailMultiAlternatives(subject, text, 'noreply@cool.com', to)
    pic = InlineImage('spirit.jpg', open(u'C:\spirit.jpg', 'rb').read(), subtype='jpeg')
    pic.attach_to_message(email)
    html = render_to_string('emails/welcome_letter.html', {'spirit': pic, 'cool': text})
    html = html.replace('%haha%', str(pic))
    email.attach_alternative(html, 'text/html')
    email.send()

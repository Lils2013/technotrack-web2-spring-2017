from __future__ import absolute_import

import time
from celery import shared_task

from core.helpers import send_mail


@shared_task
def test(instance):
    time.sleep(20)
    send_mail('hl', instance, ['lol@lol.com', ])

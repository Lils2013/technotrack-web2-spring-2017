from __future__ import unicode_literals

from django.db import models

from core.models import ModelWithAuthor, ModelWithDates, User
from events.models import WatchableModel


class Subscription(ModelWithAuthor, ModelWithDates, WatchableModel):
    target = models.ForeignKey(User, related_name='target')

    def __unicode__(self):
        return u'Subscription ' + str(self.pk) + u', source: ' + self.author.username + u', target: ' + self.target.username

    def get_title_for_event(self, eventtype):
        return u' subscribed to  ' + str(eventtype.target.username) \
               + u' at ' + str(self.created)

    class Meta:
        unique_together = ('author', 'target',)

from __future__ import unicode_literals

from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models

from core.models import ModelWithAuthor, ModelWithDates


class WatchableModel(models.Model):
    def get_title_for_event(self, eventtype):
        raise NotImplementedError

    class Meta:
        abstract = True


class Event(ModelWithAuthor, ModelWithDates):
    title = models.CharField(max_length=255)
    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    object = GenericForeignKey('content_type', 'object_id')

    def __unicode__(self):
        return u'Event ' + str(self.pk) + u', title: ' + str(self.title)

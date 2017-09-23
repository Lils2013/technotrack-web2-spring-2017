from __future__ import unicode_literals

from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db import models

from core.models import ModelWithDates, ModelWithAuthor
from events.models import WatchableModel


class Like(ModelWithDates, ModelWithAuthor, WatchableModel):
    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    object = GenericForeignKey('content_type', 'object_id')

    class Meta:
        unique_together = ('author', 'object_id', 'content_type',)

    def __unicode__(self):
        return u'Like ' + str(self.pk) + u' by ' + self.author.username

    def get_title_for_event(self, eventtype):
        return str(eventtype.content_type) + u' ' \
               + str(eventtype.object_id) + u' was liked by ' + str(eventtype.author.username) \
               + u' at ' + str(self.created)


class LikeAble(models.Model):
    likes = GenericRelation(Like, object_id_field='object_id', content_type_field='content_type')
    likes_count = models.IntegerField(default=0)

    class Meta:
        abstract = True

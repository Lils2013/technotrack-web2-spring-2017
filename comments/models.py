from __future__ import unicode_literals

from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db import models

from core.models import ModelWithAuthor, ModelWithDates
from events.models import WatchableModel
from likes.models import LikeAble


class Comment(ModelWithAuthor, ModelWithDates, LikeAble, WatchableModel):
    text = models.CharField(max_length=255)
    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    object = GenericForeignKey('content_type', 'object_id')

    def __unicode__(self):
        return u'Comment ' + str(self.pk) + u' by ' + self.author.username

    def get_title_for_event(self, eventtype):
        return u'comment ' + str(eventtype.text) + u' was posted on ' +\
               str(eventtype.content_type) + u' ' \
               + str(eventtype.object_id) + u' by ' + str(eventtype.author.username) + u' at ' + str(self.created)


class CommentAble(models.Model):
    comments = GenericRelation(Comment, object_id_field='object_id', content_type_field='content_type')
    comments_count = models.IntegerField(default=0)

    class Meta:
        abstract = True
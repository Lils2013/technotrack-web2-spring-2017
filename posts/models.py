from __future__ import unicode_literals

from django.db import models

from comments.models import CommentAble
from core.models import ModelWithAuthor, ModelWithDates
from events.models import WatchableModel
from likes.models import LikeAble


class Post(ModelWithAuthor, ModelWithDates, LikeAble, CommentAble, WatchableModel):
    text = models.CharField(max_length=255)

    def __unicode__(self):
        return u'Post ' + str(self.pk) + u' by ' + self.author.username

    def get_title_for_event(self, eventtype):
        return u'post ' + str(eventtype.text) + u' was posted by ' + str(eventtype.author.username) \
               + u' at ' + str(self.created)

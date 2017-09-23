from __future__ import unicode_literals

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType


class User(AbstractUser):
    pass


class ModelWithDates(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class ModelWithAuthor(models.Model):
    author = models.ForeignKey(User)

    class Meta:
        abstract = True


class WatchableModel(models.Model):
    def get_title_for_event(self, eventtype):
        raise NotImplementedError

    class Meta:
        abstract = True


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


class Post(ModelWithAuthor, ModelWithDates, LikeAble, CommentAble, WatchableModel):
    text = models.CharField(max_length=255)

    def __unicode__(self):
        return u'Post ' + str(self.pk) + u' by ' + self.author.username

    def get_title_for_event(self, eventtype):
        return u'post ' + str(eventtype.text) + u' was posted by ' + str(eventtype.author.username) \
               + u' at ' + str(self.created)


class Subscription(ModelWithAuthor, ModelWithDates, WatchableModel):
    target = models.ForeignKey(User, related_name='target')

    def __unicode__(self):
        return u'Subscription ' + str(self.pk) + u', source: ' + self.author.username + u', target: ' + self.target.username

    def get_title_for_event(self, eventtype):
        return str(eventtype.author.username) + u' has subscribed to  ' + str(eventtype.target.username) \
               + u' at ' + str(self.created)

    class Meta:
        unique_together = ('author', 'target',)


class Event(ModelWithAuthor, ModelWithDates):
    title = models.CharField(max_length=255)
    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    object = GenericForeignKey('content_type', 'object_id')

    def __unicode__(self):
        return u'Event ' + str(self.pk) + u', title: ' + str(self.title)
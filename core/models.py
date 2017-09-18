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


class Like(ModelWithDates, ModelWithAuthor):

    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    object = GenericForeignKey('content_type', 'object_id')


class LikeAble(models.Model):

    likes = GenericRelation(Like, object_id_field='object_id', content_type_field='content_type')
    likes_count = models.IntegerField(default=0)

    class Meta:
        abstract = True


class WatchableModel(models.Model):

    def get_title_for_event(self, eventtype):
        raise NotImplementedError

    class Meta:
        abstract = True


class Comment(ModelWithAuthor, ModelWithDates, LikeAble):

    text = models.CharField(max_length=255)
    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    object = GenericForeignKey('content_type', 'object_id')


class CommentAble(models.Model):

    comments = GenericRelation(Comment, object_id_field='object_id', content_type_field='content_type')
    comments_count = models.IntegerField(default=0)

    class Meta:
        abstract = True


class Post(ModelWithAuthor, ModelWithDates, LikeAble, CommentAble):

    prev_comments_count = None
    prev_likes_count = None
    text = models.CharField(max_length=255)


class Subscription(models.Model):

    source = models.ForeignKey(User, related_name = 'source')
    target = models.ForeignKey(User, related_name = 'target')


class Event(ModelWithAuthor):

    created = models.DateTimeField(auto_now_add=True)
    content_type = models.ForeignKey(ContentType)
    object_id = models.PositiveIntegerField()
    object = GenericForeignKey('content_type', 'object_id')
    type = models.IntegerField()
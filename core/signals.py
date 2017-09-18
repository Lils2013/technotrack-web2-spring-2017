from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_save, post_init, pre_save, m2m_changed
from .models import Comment, ModelWithAuthor, LikeAble, Like, Post


def comment_presave(instance, created=False, *args, **kwargs):

    instance.likes_count = instance.likes.count()


pre_save.connect(comment_presave, Comment)


def post_presave(instance, created=False, *args, **kwargs):

    instance.comments_count = instance.comments.count()
    instance.likes_count = instance.likes.count()


def post_postsave(instance, created=False, *args, **kwargs):

    pass


pre_save.connect(post_presave, Post)
post_save.connect(post_postsave, Post)
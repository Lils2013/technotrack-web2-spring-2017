from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_save, post_init, pre_save, m2m_changed, post_delete
from .models import Comment, ModelWithAuthor, LikeAble, Like, Post, WatchableModel, Event


def post_presave(instance, created=False, *args, **kwargs):
    pass


def post_postsave(instance, created=False, *args, **kwargs):
    pass


def like_postsave(instance, created=False, *args, **kwargs):
    instance.object.likes_count = instance.object.likes.count()
    instance.object.save()


def like_postdelete(instance, created=False, *args, **kwargs):
    instance.object.likes_count = instance.object.likes.count()
    instance.object.save()


pre_save.connect(post_presave, Post)
post_save.connect(post_postsave, Post)
post_save.connect(like_postsave, Like)
post_delete.connect(like_postdelete, Like)


def comment_postsave(instance, created=False, *args, **kwargs):
    instance.object.comments_count = instance.object.comments.count()
    instance.object.save()


def comment_postdelete(instance, created=False, *args, **kwargs):
    instance.object.comments_count = instance.object.comments.count()
    instance.object.save()


def watchable_postsave(instance, created=False, *args, **kwargs):
    if (not isinstance(instance, WatchableModel)) or not (isinstance(instance, ModelWithAuthor)) or not created:
        return
    event = Event()
    event.title = instance.get_title_for_event(instance)
    event.author = instance.author
    event.object = instance
    event.content_type = ContentType.objects.get_for_model(instance)
    event.save()


post_save.connect(comment_postsave, Comment)
post_delete.connect(comment_postdelete, Comment)
post_save.connect(watchable_postsave)

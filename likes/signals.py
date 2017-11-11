from django.db.models.signals import post_save, post_delete

from core.tasks import test
from likes.models import Like


def like_postsave(instance, created=False, *args, **kwargs):
    instance.object.likes_count = instance.object.likes.count()
    instance.object.save()
    test.apply_async([str(instance.object),])


def like_postdelete(instance, created=False, *args, **kwargs):
    instance.object.likes_count = instance.object.likes.count()
    instance.object.save()


post_save.connect(like_postsave, Like)
post_delete.connect(like_postdelete, Like)
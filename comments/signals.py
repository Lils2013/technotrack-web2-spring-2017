from django.db.models.signals import post_save, post_delete

from comments.models import Comment


def comment_postsave(instance, created=False, *args, **kwargs):
    instance.object.comments_count = instance.object.comments.count()
    instance.object.save()


def comment_postdelete(instance, created=False, *args, **kwargs):
    instance.object.comments_count = instance.object.comments.count()
    instance.object.save()


post_save.connect(comment_postsave, Comment)
post_delete.connect(comment_postdelete, Comment)
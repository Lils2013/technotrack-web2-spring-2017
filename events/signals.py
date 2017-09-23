from django.contrib.contenttypes.models import ContentType
from django.db.models.signals import post_save
from core.models import ModelWithAuthor
from events.models import WatchableModel, Event


def watchable_postsave(instance, created=False, *args, **kwargs):
    if (not isinstance(instance, WatchableModel)) or not (isinstance(instance, ModelWithAuthor)) or not created:
        return
    event = Event()
    event.title = instance.get_title_for_event(instance)
    event.author = instance.author
    event.object = instance
    event.content_type = ContentType.objects.get_for_model(instance)
    event.save()


post_save.connect(watchable_postsave)
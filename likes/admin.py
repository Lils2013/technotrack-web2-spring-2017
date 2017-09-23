from django.contrib import admin
from django.contrib.contenttypes.admin import GenericStackedInline

from likes.models import Like


class LikesInline(GenericStackedInline):

    model = Like
    ct_field = 'content_type'
    ct_fk_field = 'object_id'


class LikeAbleAdmin(admin.ModelAdmin):

    inlines = LikesInline,


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):

    readonly_fields = 'created', 'updated'
from django.contrib import admin
from django.contrib.contenttypes.admin import GenericStackedInline

from comments.models import Comment
from likes.admin import LikeAbleAdmin


@admin.register(Comment)
class CommentAdmin(LikeAbleAdmin):

    readonly_fields = 'likes_count', 'created', 'updated'


class CommentsInline (GenericStackedInline):

    readonly_fields = 'likes_count',
    model = Comment
    ct_field = 'content_type'
    ct_fk_field = 'object_id'
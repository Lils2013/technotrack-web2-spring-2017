from django.contrib import admin

from core.admin import LikeAndCommentAbleAdmin
from posts.models import Post


@admin.register(Post)
class PostAdmin(LikeAndCommentAbleAdmin):

    readonly_fields = 'likes_count', 'comments_count', 'created', 'updated'
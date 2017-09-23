from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from comments.admin import CommentsInline
from likes.admin import LikesInline
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):

    pass


class LikeAndCommentAbleAdmin(admin.ModelAdmin):

    inlines = LikesInline, CommentsInline,

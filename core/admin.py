from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.contenttypes.admin import GenericStackedInline
from .models import User, Post, Comment, Like, Subscription, Event


@admin.register(User)
class UserAdmin(BaseUserAdmin):

    pass


class LikesInline(GenericStackedInline):

    model = Like
    ct_field = 'content_type'
    ct_fk_field = 'object_id'


class CommentsInline (GenericStackedInline):

    readonly_fields = 'likes_count',
    model = Comment
    ct_field = 'content_type'
    ct_fk_field = 'object_id'


class LikeAndCommentAbleAdmin(admin.ModelAdmin):

    inlines = LikesInline, CommentsInline,


class LikeAbleAdmin(admin.ModelAdmin):

    inlines = LikesInline,


@admin.register(Post)
class PostAdmin(LikeAndCommentAbleAdmin):

    readonly_fields = 'likes_count', 'comments_count', 'created', 'updated'


@admin.register(Comment)
class CommentAdmin(LikeAbleAdmin):

    readonly_fields = 'likes_count', 'created', 'updated'


@admin.register(Subscription)
class CommentAdmin(admin.ModelAdmin):

    readonly_fields = 'created', 'updated'


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):

    readonly_fields = 'created', 'updated'


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):

    readonly_fields = 'created', 'updated'

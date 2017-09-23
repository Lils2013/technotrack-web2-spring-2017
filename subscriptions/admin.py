from django.contrib import admin

from subscriptions.models import Subscription


@admin.register(Subscription)
class CommentAdmin(admin.ModelAdmin):

    readonly_fields = 'created', 'updated'
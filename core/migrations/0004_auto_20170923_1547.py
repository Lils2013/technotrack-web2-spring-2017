# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-09-23 12:47
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
        ('core', '0003_auto_20170923_1543'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='like',
            unique_together=set([('author', 'object_id', 'content_type')]),
        ),
    ]

# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-11 18:30
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='report_sent',
            field=models.BooleanField(default=False),
        ),
    ]

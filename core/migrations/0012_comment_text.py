# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-09-18 11:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_auto_20170918_1415'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='text',
            field=models.CharField(default='lol', max_length=255),
            preserve_default=False,
        ),
    ]

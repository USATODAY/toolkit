# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-04-04 22:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tables', '0009_auto_20160404_1917'),
    ]

    operations = [
        migrations.AddField(
            model_name='tableviz',
            name='published',
            field=models.BooleanField(default=False),
        ),
    ]
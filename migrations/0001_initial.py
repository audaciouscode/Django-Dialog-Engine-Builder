# -*- coding: utf-8 -*-
# Generated by Django 1.11.23 on 2019-12-02 17:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='InteractionCard',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=4096, unique=True)),
                ('identifier', models.SlugField(max_length=4096, unique=True)),
                ('description', models.TextField(blank=True, max_length=16384, null=True)),
                ('enabled', models.BooleanField(default=True)),
                ('evaluate_function', models.TextField(default='return None, [], None', max_length=1048576)),
                ('entry_actions', models.TextField(default='return []', max_length=1048576)),
                ('client_implementation', models.FileField(blank=True, null=True, upload_to='interaction_cards/')),
            ],
        ),
    ]

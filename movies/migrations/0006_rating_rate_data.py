# Generated by Django 3.2.5 on 2021-07-20 18:41

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0005_alter_movie_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='rating',
            name='rate_data',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]

# Generated by Django 3.2.5 on 2021-07-20 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0004_watchlist'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='title',
            field=models.CharField(max_length=220, unique=True),
        ),
    ]
# Generated by Django 3.2.5 on 2021-07-20 18:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0006_rating_rate_data'),
    ]

    operations = [
        migrations.RenameField(
            model_name='rating',
            old_name='rate_data',
            new_name='rate_date',
        ),
    ]

# Generated by Django 3.2.5 on 2021-11-16 10:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_rename_user_id_buyingpower_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='watchlist',
            old_name='username',
            new_name='user',
        ),
    ]

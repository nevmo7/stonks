# Generated by Django 3.2.5 on 2021-09-21 11:59

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('username', models.CharField(max_length=20, unique=True, verbose_name='username')),
                ('email', models.EmailField(max_length=50, unique=True, verbose_name='email')),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_admin', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('date_joined', models.DateTimeField(auto_now=True, verbose_name='date joined')),
                ('last_login', models.DateTimeField(auto_now_add=True, verbose_name='last login')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]

# Generated by Django 3.2.5 on 2021-10-01 09:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_buyingpower_orders_portfolio_watchlist'),
    ]

    operations = [
        migrations.AddField(
            model_name='buyingpower',
            name='username',
            field=models.OneToOneField(default=0, on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='portfolio',
            name='buy_price',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='buyingpower',
            name='amount',
            field=models.FloatField(default=0),
        ),
        migrations.DeleteModel(
            name='Orders',
        ),
    ]

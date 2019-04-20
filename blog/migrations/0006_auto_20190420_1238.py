# Generated by Django 2.2 on 2019-04-20 12:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0005_auto_20190420_1233'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='description',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='category',
            name='featured_image',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='blog.Image'),
        ),
    ]

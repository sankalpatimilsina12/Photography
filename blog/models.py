from django.db import models
import hashlib
import time
import os


def update_filename(instance, filename):
    m = hashlib.md5()
    name, extension = os.path.splitext(filename)
    m.update((name + str(time.time())).encode("utf-8"))
    return m.hexdigest() + extension


class Image(models.Model):
    title = models.CharField(max_length=20)
    file = models.ImageField(blank=True, upload_to=update_filename)
    alt = models.CharField(max_length=20, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Category(models.Model):
    name = models.CharField(max_length=20)
    description = models.TextField(blank=True)
    featured_image = models.ForeignKey("Image", on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta(object):
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

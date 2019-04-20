from django.db import models
from django.utils import timezone

# Create your models here.
class Image(models.Model):
    title = models.CharField(max_length=20)
    file_name = models.CharField(max_length=200)
    alt = models.CharField(max_length=20)
    description = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def update(self):
        self.updated_at = timezone.now()
        self.save()

    def __str__(self):
        return self.title


class Category(models.Model):
    name = models.CharField(max_length=20)
    description = models.TextField()
    featured_image = models.ForeignKey("Image", on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now)

    def update(self):
        self.updated_at = timezone.now()
        self.save()

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=10)
    updated_at = models.DateTimeField(default=timezone.now)

    def update(self):
        self.updated_at = timezone.now()
        self.save()

    def __str__(self):
        return self.name

from django.contrib import admin
from .models import Image, Category, Tag

# Register your models here.
class ImageAdmin(admin.ModelAdmin):
    exclude = ("filename",)


admin.site.register(Image, ImageAdmin)
admin.site.register(Category)
admin.site.register(Tag)

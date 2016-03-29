from django.contrib import admin

# Register your models here.
from django.contrib import admin
from models import Document


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    pass




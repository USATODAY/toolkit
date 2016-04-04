from django.contrib import admin

# Register your models here.
from django.contrib import admin
from models import TableViz


@admin.register(TableViz)
class VizAdmin(admin.ModelAdmin):
    list_display = ('title', 'file')
#     TODO add edit link
#   TODO add live link if published




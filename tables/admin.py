from django.contrib import admin

# Register your models here.
from django.contrib import admin
from models import Viz


@admin.register(Viz)
class VizAdmin(admin.ModelAdmin):
    pass




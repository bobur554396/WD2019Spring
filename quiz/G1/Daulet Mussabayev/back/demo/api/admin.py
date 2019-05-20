from django.contrib import admin
from . import models

admin.site.register(models.Contact)

@admin.register(models.Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_by',)

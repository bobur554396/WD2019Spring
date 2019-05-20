from django.contrib import admin
from api.models import Contacts

@admin.register(Contacts)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_by',)

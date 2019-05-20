from django.contrib import admin
from api.models import Contact



@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_by',)

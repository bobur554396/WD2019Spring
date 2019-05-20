from django.contrib import admin
from .models import CreatedBy, Contact

admin.site.register(Contact)


@admin.register(CreatedBy)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'phone', 'created_by')

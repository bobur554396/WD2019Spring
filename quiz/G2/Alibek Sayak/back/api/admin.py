from django.contrib import admin
from api.models import Contact

@admin.register(Contact)
class Contact(admin.ModelAdmin):
    list_display = ('id', 'name', 'phone', 'created_by', )

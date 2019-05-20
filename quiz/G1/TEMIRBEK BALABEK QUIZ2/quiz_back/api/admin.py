from django.contrib import admin
from api.models import Contacts
# Register your models here.
@admin.register(Contacts)
class TaskListAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'phone')

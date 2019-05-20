from django.contrib import admin
from api.models import Contact
# Register your models here.
@admin.register(Contact)
class TaskListAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone','created_by')

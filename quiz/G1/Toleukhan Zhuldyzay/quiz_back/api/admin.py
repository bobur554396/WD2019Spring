from django.contrib import admin
from api.models import Contact


admin.site.register()


@admin.register(Contact)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'created_by',)


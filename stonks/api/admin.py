from django.contrib import admin
from api.models import User
from django.contrib.auth.models import Group

# Register your models here.
admin.site.site_header = "Stonks Admin Panel"
admin.site.site_title = "Stonks Admin Panel"
class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "date_joined", "last_login")

admin.site.register(User, UserAdmin)
admin.site.unregister(Group)
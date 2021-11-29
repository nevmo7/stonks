from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.db import models
from django.db.models.fields.related import ForeignKey, OneToOneField

# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        if not email:
            raise ValueError("Users must have an email address")
        
        if not username:
            raise ValueError("Users must have an username")

        user = self.model(
            email = self.normalize_email(email),
            username = username,
            )

        user.set_password(password)
        user.save(using=self._db)
        buying_power = BuyingPower(user = user)
        buying_power.save()

        return user

    def create_superuser(self, username, email, password=None):

        user = self.create_user(
            email = self.normalize_email(email),
            password = password,
            username = username,
            )

        user.is_staff = True
        user.is_admin = True
        user.is_superuser = True
        user.save(using = self._db)
        return user

class User(AbstractBaseUser):
    username = models.CharField(verbose_name='username' ,max_length=20, unique=True)
    email = models.EmailField(verbose_name='email', max_length=50, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False) 
    is_admin = models.BooleanField(default=False) 
    is_superuser = models.BooleanField(default = False)
    date_joined = models.DateTimeField( verbose_name='date joined', auto_now=True)
    last_login = models.DateTimeField( verbose_name='last login', auto_now_add=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email',]

    objects = UserManager()

    def __str__(self) :
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True


class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock_ticker = models.CharField(max_length=6)

class Portfolio(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock_ticker = models.CharField(max_length=6)
    units = models.IntegerField(null=False)
    buy_price = models.FloatField(null=False, default=0)


class BuyingPower(models.Model):
    user = OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    amount = models.FloatField(null=False, default=0)

    def getBuyingPower(username, self):
        return self.amount




    
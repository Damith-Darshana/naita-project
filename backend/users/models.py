

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    USER_TYPE_CHOICES = (
        (1, 'Admin'),
        (2, 'Instructor'),
        (3, 'Student'),
    )
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES, default=3)
    nic_number = models.CharField(max_length=12, unique=True, null=True, blank=True)
    phone = models.CharField(max_length=15)
    address = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.get_full_name() or self.username
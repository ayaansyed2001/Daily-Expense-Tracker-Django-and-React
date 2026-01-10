from django.db import models

# Create your models here.

class UserDetail(models.Model):
    FullName = models.CharField(max_length=100)
    Email = models.EmailField(unique=True,max_length=100)
    Password = models.CharField(max_length=50)
    Regdate = models.DateTimeField(auto_now_add=True) 
    
    def __str__(self):
        return self.FullName

class ExpenseDetail(models.Model):
    UserId = models.ForeignKey(UserDetail, on_delete=models.CASCADE)
    ExpenseDate = models.DateField(null=True, blank=True)
    ExpenseItem = models.CharField(max_length=200)
    ExpenseCost = models.CharField(max_length=50)
    NoteDate = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.ExpenseItem

    
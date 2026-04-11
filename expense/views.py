from django.shortcuts import render
from django.http import JsonResponse
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
import json
from .models import UserDetail, ExpenseDetail
from django.db.models import Sum

# Create your views here.

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        fullname = data.get('FullName')
        email = data.get('Email')
        password = data.get('Password')
        
        if UserDetail.objects.filter(Email=email).exists():
            return JsonResponse({'message': 'Email already exists'}, status=400)
        
        UserDetail.objects.create(FullName=fullname, Email=email, Password=password)
        return JsonResponse({'message': 'User registered successfully'}, status=201)
    
@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        email = data.get('Email')
        password = data.get('Password')
        
        try:
           user = UserDetail.objects.get(Email=email, Password=password)
           return JsonResponse({'message': 'Login successful','user_id': user.id,'userName': user.FullName}, status=200)
        except UserDetail.DoesNotExist:
            return JsonResponse({'message': 'Invalid credentials'}, status=400)

@csrf_exempt
def add_expense(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_id = data.get('UserId')
        expense_date = data.get('ExpenseDate')
        expense_cost = data.get('ExpenseCost')
        expense_item = data.get('ExpenseItem')

       
        user = UserDetail.objects.get(id=user_id)
        try:
              ExpenseDetail.objects.create(
                UserId=user,
                ExpenseDate=expense_date,
                ExpenseCost=expense_cost,
                ExpenseItem=expense_item
              )
              return JsonResponse({'message': 'Expense added successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'message': 'Something went wrong', 'error': str(e)}, status=400)
        
        
@csrf_exempt
def manage_expense(request, user_id):
    if request.method == 'GET':
        expenses = ExpenseDetail.objects.filter(UserId=user_id)
        expense_list = list(expenses.values())
        return JsonResponse(expense_list,safe=False)

@csrf_exempt
def update_expense(request, expense_id):
    if request.method == 'PUT':
        data = json.loads(request.body)
        user_id = data.get('UserId')
        try:
            expense = ExpenseDetail.objects.get(id=expense_id)
            expense.ExpenseDate = data.get('ExpenseDate', expense.ExpenseDate)
            expense.ExpenseCost = data.get('ExpenseCost', expense.ExpenseCost)
            expense.ExpenseItem = data.get('ExpenseItem', expense.ExpenseItem)
            expense.save()
            return JsonResponse({'message': 'Expense updated successfully'}, status=200)
        except ExpenseDetail.DoesNotExist:
            return JsonResponse({'message': 'Expense not found'}, status=404)


@csrf_exempt
def delete_expense(request, expense_id):
    if request.method == 'DELETE':
        try:
            expense = ExpenseDetail.objects.get(id=expense_id)
            expense.delete()
            return JsonResponse({'message': 'Expense deleted successfully'}, status=200)
        except ExpenseDetail.DoesNotExist:
            return JsonResponse({'message': 'Expense not found'}, status=404)
        
        
        
@csrf_exempt
def search_expense(request, user_id):
    if request.method == 'GET':
        from_date = request.GET.get('from')
        to_date = request.GET.get('to')
        #convert string to date
        from_date = datetime.strptime(from_date, "%Y-%m-%d").date()
        to_date = datetime.strptime(to_date, "%Y-%m-%d").date()
        expenses = ExpenseDetail.objects.filter(UserId=user_id,ExpenseDate__range=[from_date, to_date])
        expense_list = list(expenses.values())
        agg = expenses.aggregate(Sum('ExpenseCost'))  #{'ExpenseCost__sum': 1500}
        total=agg['ExpenseCost__sum'] or 0
        return JsonResponse({'expenses': expense_list,'total': total})
    
@csrf_exempt
def change_password(request, user_id):
    if request.method == 'POST':
        data = json.loads(request.body)
        old_password = data.get('oldPassword')
        new_password = data.get('newPassword')

        try:
            user= UserDetail.objects.get(id=user_id)
            if user.Password != old_password:
                
                return JsonResponse({'message': 'Invalid old password'}, status=400)
            user.Password = new_password
            user.save()
            return JsonResponse({'message': 'Password changed successfully'}, status=200)
        except UserDetail.DoesNotExist:
            return JsonResponse({'message': 'User not found'}, status=400)
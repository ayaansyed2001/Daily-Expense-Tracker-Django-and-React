import React from "react";
import { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import {Pie} from 'react-chartjs-2'
import API_URL from "../api";
import { Chart,ArcElement,Tooltip,Legend} from "chart.js"; //npm install chart.js react-chartjs-2 isse chart aata ha iisko install krna padta hai 


Chart.register(ArcElement, Tooltip, Legend);
const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const userId = localStorage.getItem("user_id");

  const [expense, setExpense] = useState([]);
  const [todayTotal, setTodayTotal] = useState(0);
  const [yesterdayTotal, setYesterdayTotal] = useState(0);
  const [weekTotal, setWeekTotal] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);
  const [yearTotal, setYearTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
            useEffect(() => {
              if (!userId) {
                  navigate('/login');
              }
              
              fetchExpenses(userId);
              
          },[]);

          const pieData={
            labels : expense.map(exp => exp.ExpenseItem),
            datasets:[
              {

                label :"Expense Cost",
                data : expense.map(exp => parseFloat(exp.ExpenseCost)),
                backgroundColor : [
                  'red',
                  'blue',
                  'green',
                  'yellow',
                  'orange',
                  'purple',
                  'pink',
                  'brown',
                  'grey',
                  'cyan',
                   

                ],

                borderWidth :3,
              },
            ],
          };

       const fetchExpenses = async (userId) => {
              try{
                  const response = await fetch(`${API_URL}/api/manage_expense/${userId}`)
                  const data = await response.json();
                  setExpense(data);
                  calculateTotals(data);
  
  
              }
              catch(error){
                  console.error("Error fetching expenses:", error);
                  toast.error("Failed to fetch expenses. Please try again later.");
              }
  
          }

  
    const calculateTotals = (data) => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        const week = new Date();
        week.setDate(today.getDate() - 7); // 7 days ago
        const month = new Date();
        month.setDate(today.getDate() - 30); // 30 days ago
        const year = new Date();
        year.setDate(today.getDate() - 365); // 365 days ago

        let todaySum = 0;
        let yesterdaySum = 0;
        let weekSum = 0;
        let monthSum = 0;
        let yearSum = 0;
        let grandSum = 0;

        data.forEach(item => {
            const expenseDate = new Date(item.ExpenseDate);
            const amount = parseFloat(item.ExpenseCost) || 0;

            if(expenseDate.toDateString()=== today.toDateString()){
                todaySum += amount;
            }
            if(expenseDate.toDateString()=== yesterday.toDateString()){
                yesterdaySum += amount;
            }
            if(expenseDate >= week){
                weekSum += amount;
            }
            if(expenseDate >= month){
                monthSum += amount;
            }
            if(expenseDate >= year){
                yearSum += amount;
            }
            grandSum += amount;

        }

        )
        setTodayTotal(todaySum);
        setYesterdayTotal(yesterdaySum);
        setWeekTotal(weekSum);
        setMonthTotal(monthSum);
        setYearTotal(yearSum);
        setGrandTotal(grandSum);
    }

  return (
    <div className="container mt-4">
      <div className="text-center">
        <h2>Welcome, {userName}!</h2>
        <p className="lead">Here's your dashboard overview.</p>
      </div>
      <div className="row g-4">
        <div className="col-md-4">
          <div
            className="card mb-3 bg-primary text-white text-center"
            style={{ height: "150px" }}
          >
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-calender-day me-2"></i>Today's Expenses
              </h5>

              <p className="card-text">₹{todayTotal}</p>
            </div>
          </div>
        </div>
         <div className="col-md-4">
          <div
            className="card bg-success text-white text-center mb-3"
            style={{ height: "150px" }}
          >
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-calender-day me-2"></i>Yesterday's Expenses
              </h5>

              <p className="card-text">₹{yesterdayTotal}</p>
            </div>
          </div>
        </div>
         <div className="col-md-4">
          <div
            className="card bg-danger text-white text-center mb-3"
            style={{ height: "150px" }}
          >
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-calender-day me-2"></i>week Expenses
              </h5>

              <p className="card-text">₹{weekTotal}</p>
            </div>
          </div>
        </div>
         <div className="col-md-4">
          <div
            className="card bg-success text-white text-center mb-3"
            style={{ height: "150px" }}
          >
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-calender-day me-2"></i>month Expenses
              </h5>

              <p className="card-text">₹{monthTotal}</p>
            </div>
          </div>
        </div>
         <div className="col-md-4">
          <div
            className="card bg-danger text-white text-center mb-3"
            style={{ height: "150px" }}
          >
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-calender-day me-2"></i>year Expenses
              </h5>

              <p className="card-text">₹{yearTotal}</p>
            </div>
          </div>
        </div>
         <div className="col-md-4">
          <div
            className="card bg-warning text-white text-center mb-3"
            style={{ height: "150px" }}
          >
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-calender-day me-2"></i>Grand Total
              </h5>

              <p className="card-text">₹{grandTotal}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="my-5" style={{width:'400px', height:'400px', marginLeft:'auto', marginRight:'auto'}}>

        <h4 className="text-center">Expense Distribution</h4>
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default Dashboard;

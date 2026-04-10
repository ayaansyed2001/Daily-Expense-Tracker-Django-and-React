import React, { useState, useEffect } from "react";
import API_URL from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ExpenseReport = () => {
  const navigate = useNavigate();

  const [fromDate, setFromDate] = useState();
      const [expenses, setExpenses] = useState([]);
  const [toDate, setToDate] = useState('');
  const [grandTotal, setGrandTotal] = useState(0);

  const userId = localStorage.getItem("user_id");
  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/search_expense/${userId}/?from=${fromDate}&to=${toDate}`);
      const data = await response.json();
      setExpenses(data.expenses);
      setGrandTotal(data.total);
      console.log("Fetched expenses:", data);
     
    } catch (error) {
      console.error("error fetching error:", error);
      toast.error(" Please try again.");
    }
  };
  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>
          <i className="fas fa-file-invoice-dollar me-2"></i>Expense Report
        </h2>
        <p className="text-muted">Search and Analyze your expenses</p>
      </div>

      <form
        className="row"
        style={{ maxWidth: "400px" }}
        onSubmit={handleSubmit}
      >
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-calendar-alt"></i>
            </span>
            <input
              type="date"
              name="fromdate"
              className="form-control"
              required
              placeholder="Enter Expense Date"
              onChange={(e) => setFromDate(e.target.value)}
              value={fromDate}
            />
          </div>
        </div>
        <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-calendar-alt"></i>
            </span>
            <input
              type="date"
              name="todate"
              className="form-control"
              required
              placeholder="Enter Expense Date"
              onChange={(e) => setToDate(e.target.value)}
              value={toDate}
            />
          </div>

        <div className="col-md-4">
          <button type="submit" className="btn btn-primary w-100">
          <i className="fas fa-search me-2"></i>Search
        </button>
        </div>
      </form>
<div className="mt-5">
      <table className='table table-striped table-bordered'>
                        <thead className='table-dark text-center'>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Item</th>
                                <th>Cost (₹)</th>
                                  
                            </tr>
                            </thead>
                            <tbody>
                                {expenses.length > 0 ? (
                                    expenses.map((exp, index) => (
                                    <tr key={exp.id}>
                                    <td>{index + 1}</td>
                                    <td>{exp.ExpenseDate}</td>
                                    <td>{exp.ExpenseItem}</td>
                                    <td>{exp.ExpenseCost}</td>
                                       
                                </tr>

                                    ))
                                ) :
                               
                                (
                                    <tr>
                                <td colSpan={5} className='text-center text-muted'>
                                    <i className="fas fa-exclamation-circle me-2"></i>No expenses found</td>
                            </tr>

                                )}
                           
                            
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="3" className="text-end"><strong>Total Expenses:</strong></td>
                            <td className="text-success"><strong>{grandTotal}</strong></td>
                          </tr>
                        </tfoot>
                        
                    </table>
                    </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default ExpenseReport;

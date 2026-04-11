import API_URL from "../api";
import React,{useState,useEffect} from 'react'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const ManageExpense = () => {
    const navigate = useNavigate();

    const [expenses, setExpenses] = useState([]);
    const [editExpense, setEditExpense] = useState(null);
    const handleEdit = (expense) => {
        setEditExpense(expense);
    }
    const handleChange = (e) => {
            setEditExpense({...editExpense, 
                [e.target.name]: e.target.value});
        }    
    const handleSaveChanges = async () => {
        try{
            const response = await fetch(`${API_URL}/api/update_expense/${editExpense.id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editExpense)
            });
            if(response.status === 200){
                toast.success("Expense updated successfully!");
                setEditExpense(null);
                fetchExpenses(userId);
            }
            else{

                toast.error('Please try again.');
            }

        } catch(error){
            console.error("Error updating expense:", error);
            toast.error("Failed to update expense. Please try again later.");
        }
    }
const handleDelete = async (expenseId) => {
    if(window.confirm("Are you sure you want to delete this expense?")){
        try{
            const response = await fetch(`${API_URL}/api/delete_expense/${expenseId}/`, {
                method: "DELETE",
            });
            if(response.status === 200){
                toast.success("Expense deleted successfully!");
                fetchExpenses(userId);
            }
            else{
                toast.error('Please try again.');
            }

        } catch(error){
            console.error("Error deleting expense:", error);
            toast.error("Failed to delete expense. Please try again later.");
        }
    }
}
    const userId = localStorage.getItem('user_id');
     const fetchExpenses = async (userId) => {
            try{
                const response = await fetch(`${API_URL}/api/manage_expense/${userId}`)
                const data = await response.json();
                setExpenses(data);


            }
            catch(error){
                console.error("Error fetching expenses:", error);
                toast.error("Failed to fetch expenses. Please try again later.");
            }

        }
        useEffect(() => {
            if (!userId) {
                navigate('/login');
            }
            
            fetchExpenses(userId);
            
        },[]);
       
  return (
    <div className='app-page'>
            <div className="page-heading">
                <span className="page-kicker">Your records</span>
                <h2><i className="fas fa-tasks me-2"></i>Manage Expense</h2>
                <p>View, edit, and delete your expenses</p>
                </div>
                <div className="table-panel">

                    <table className='table app-table'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Item</th>
                                <th>Cost (Rs)</th>
                                <th>Action</th>   
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
                                    <td>
                                        <button type="button" className='btn table-action edit me-2' onClick={() => handleEdit(exp)}><i className='fas fa-edit' ></i></button>
                                        <button type="button" className='btn table-action delete' onClick={() => handleDelete(exp.id)}><i className='fas fa-trash' ></i></button>
                                        </td>   
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
                        
                    </table>
                </div>
                
{editExpense && (
    <div className="modal show d-block" style={{background : 'rgba(0,0,0,0.5)'}} >
  <div className="modal-dialog" >
    <div className="modal-content">
      <div className="modal-header modal-topbar">
        <h5 className="modal-title"><i className="fas fa-pen me-2"></i>Edit Expense</h5>
        <button type="button" className="btn-close" onClick={() => setEditExpense(null)} aria-label="Close">
        
        </button>
      </div>
      <div className="modal-body">
        <div className='mb-3'>
                        <label className='form-label'>Expense Date</label>
                        <div className='input-group'>
                            <span className='input-group-text'>
                                <i className="fas fa-calendar-alt"></i>
                            </span>
                            <input type="date" name='ExpenseDate' className="form-control" required placeholder='Enter Expense Date'
                            onChange={handleChange}
                            value={editExpense.ExpenseDate}/>
                    </div>
                    </div>
    
                        
                    <div className='mb-3'> 
                        <label className='form-label'>Expense Item</label>
                        <div className='input-group'>
                             <span className='input-group-text'>
                                <i className="fas fa-shopping-cart"></i>
                            </span>
                            
                            <input type="text" name="ExpenseItem" className="form-control" required placeholder='Enter Expense Item' onChange={handleChange}
                            value={editExpense.ExpenseItem}/>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Expense Cost (Rs)</label>
                        <div className='input-group'>
                             <span className='input-group-text'>
                                <i className="fas fa-rupee-sign"></i>
                            </span>


                            <input type="number" name="ExpenseCost" className="form-control" required placeholder='Enter Expense Cost' 
                            value={editExpense.ExpenseCost}
                            onChange={handleChange} />
    
                        </div>
                        
                    </div>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn app-btn" onClick={handleSaveChanges}>Save changes</button>
        <button type="button" className="btn outline-btn" onClick={() => setEditExpense(null)}>Close</button>
      </div>
    </div>
  </div>
</div>
)}


                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  )
}

export default ManageExpense

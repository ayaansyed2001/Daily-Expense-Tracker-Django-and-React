import React,{useState,useEffect} from 'react'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import API_URL from "../api";

const AddExpense = () => {

    const navigate = useNavigate();
        
        const [formData, setFormData] = useState({
            ExpenseDate: "",
            ExpenseItem: "",
            ExpenseCost: ""
        });
    const userId = localStorage.getItem('user_id');
    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }

    },)


        const handleChange = (e) => {
            setFormData({...formData, 
                [e.target.name]: e.target.value});
        }
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            try{
                const response = await fetch(`${API_URL}/api/add_expense/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({  
                        ...formData, 
                        UserId: userId })
                });
                const data = await response.json();
                if(response.status === 200){
                    toast.success("Expense added successfully!");
                    setTimeout(() =>{
                        navigate('/dashboard');
                    }, 2000);
                }
                else{
                    
                    toast.error(`Error: ${data.message || 'Please try again.'}`);
                }
    
            }
            catch(error){
                console.error("something went wrong:", error);
                toast.error(" Please try again.");
    
            }
        }
  return (
     <div className='container mt-5'>
            <div className="text-center mb-4">
                <h2><i className="fas fa-plus-circle me-2"></i>Add Expense</h2>
                <p className='text-muted'>Add a new expense to your tracker</p>
                </div>
    
                <form className='p-4 border rounded mx-auto' style={{maxWidth:"400px"}} 
                onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>Expense Date</label>
                        <div className='input-group'>
                            <span className='input-group-text'>
                                <i className="fas fa-calendar-alt"></i>
                            </span>
                            <input type="date" name='ExpenseDate' className="form-control" required placeholder='Enter Expense Date'
                            onChange={handleChange}
                            value={formData.ExpenseDate}/>
                    </div>
                    </div>
    
                        
                    <div className='mb-3'> 
                        <label className='form-label'>Expense Item</label>
                        <div className='input-group'>
                             <span className='input-group-text'>
                                <i className="fas fa-shopping-cart"></i>
                            </span>
                            
                            <input type="text" name="ExpenseItem" className="form-control" required placeholder='Enter Expense Item' onChange={handleChange}
                            value={formData.ExpenseItem}/>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Expense Cost (₹)</label>
                        <div>
                             <span className='input-group-text'>
                                <i className="fas fa-rupee-sign"></i>
                            </span>


                            <input type="number" name="ExpenseCost" className="form-control" required placeholder='Enter Expense Cost' 
                            value={formData.ExpenseCost}
                            onChange={handleChange} />
    
                        </div>
                        
                    </div>

                    <button type="submit" className="btn btn-primary w-100"><i className="fas fa-plus me-2"></i>Add Expense</button>
                    
                </form>
                <ToastContainer position="top-center" />
        </div>
  )
}

export default AddExpense
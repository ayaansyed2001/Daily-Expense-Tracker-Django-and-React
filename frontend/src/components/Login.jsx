import API_URL from "../api";
import React,{useState} from 'react'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
            
            Email: "",
            Password: ""
        });
        const handleChange = (e) => {
            setFormData({...formData, 
                [e.target.name]: e.target.value});
        }
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            try{
                const response = await fetch(`${API_URL}/api/login/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData)
                });
                const data = await response.json();
                if(response.status === 200){
                    toast.success("Login successful! You can now access your account.");
                    localStorage.setItem('user_id', data.user_id);
                    localStorage.setItem('userName', data.userName);
                    setTimeout(() =>{
                        navigate('/dashboard');
                    }, 2000);
                }
                else{
                    toast.error(`Login failed: ${data.message || 'Please try again.'}`);
                }
    
            }
            catch(error){
                console.error("Error during signup:", error);
                toast.error("Signup failed. Please try again.");
    
            }
        }
  return (
    <div className='login-page'>
        <div className='login-shell'>
            <div className='login-info'>
                <div className='login-badge'>
                    <i className="fas fa-wallet me-2"></i>
                    Expense Tracker
                </div>
                <h1>Welcome back</h1>
                <p>Track today, plan tomorrow, and keep every rupee in sight.</p>
                <div className='login-stats'>
                    <div>
                        <strong>Daily</strong>
                        <span>spending view</span>
                    </div>
                    <div>
                        <strong>Fast</strong>
                        <span>expense entry</span>
                    </div>
                </div>
            </div>
    
            <form className='login-card' 
                onSubmit={handleSubmit}>
                    <div className="text-center mb-4">
                        <div className='login-icon'>
                            <i className="fas fa-user"></i>
                        </div>
                        <h2>Login</h2>
                        <p>Access your account to start tracking expenses</p>
                    </div>
                    <div className='mb-3'> 
                        <label className='form-label'>Email address</label>
                        <div className='input-group'>
                             <span className='input-group-text'>
                                <i className="fas fa-envelope"></i>
                            </span>
                            
                            <input type="email" name="Email" className="form-control" required placeholder='enter your email' onChange={handleChange}
                            value={formData.Email}/>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Password</label>
                        <div className='input-group'>
                             <span className='input-group-text'>
                                <i className="fas fa-lock"></i>
                            </span>
    
    
                            <input type="password" name="Password" className="form-control" required placeholder='Enter Password....' 
                            value={formData.Password}
                            onChange={handleChange} />
    
                        </div>
                        
                    </div>

                    <button type="submit" className="btn login-btn w-100"><i className="fas fa-sign-in-alt me-2"></i>Login</button>
                    
                </form>
            </div>
                <ToastContainer position="top-center" />
        </div>
  )
}

export default Login

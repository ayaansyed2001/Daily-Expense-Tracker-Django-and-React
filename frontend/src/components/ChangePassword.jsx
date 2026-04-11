import React,{useState} from 'react'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import API_URL from "../api";

const ChangePassword = () => {
     const navigate = useNavigate();
        
        const [formData, setFormData] = useState({
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
                const userId = localStorage.getItem('user_id');
        useEffect(() => {
                    if (!userId) {
                        navigate('/login');
                    }
                    
                    
                    
                },[]);


        const handleChange = (e) => {
            setFormData({...formData, 
                [e.target.name]: e.target.value});
        }
    const handleSubmit = async (e) => {
            e.preventDefault();

            if(formData.newPassword !== formData.confirmPassword){
                toast.error("New password and confirm password do not match.");
                return;
            }
            try{

                const response = await fetch(`${API_URL}/api/change_password/${userId}/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        
                        oldPassword: formData.oldPassword,
                        newPassword: formData.newPassword,
                    })
                });

                const data = await response.json();


                if(response.status === 200){
                    toast.success("Password changed successfully! Please login again.",data.message);
                    setFormData({
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                    });
                    
                }
                else{
                    
                    toast.error(data.message || "Password change failed. Please try again.");
                }
    
            }
            catch(error){
                console.error("Error :", error);
                toast.error("Please try again.");
    
            }
        }

  return (
    <div className='app-page'>
            <div className="page-heading">
                <span className="page-kicker">Account safety</span>
                <h2><i className="fas fa-key me-2"></i>Change Password</h2>
                <p>Secure your account with a new password</p>
                </div>
    
                <form className='app-form-card mx-auto' style={{maxWidth:"460px"}} 
                onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>Old Password</label>
                        <div className='input-group'>
                            <span className='input-group-text'>
                                <i className="fas fa-lock"></i>
                            </span>
                            <input type="password" name='oldPassword' className="form-control" required placeholder='Enter your old password'
                            onChange={handleChange}
                            value={formData.oldPassword}/>
                    </div>
                    </div>
    
                        
                    <div className='mb-3'> 
                        <label className='form-label'>New Password</label>
                        <div className='input-group'>
                             <span className='input-group-text'>
                                <i className="fas fa-lock-open"></i>
                            </span>
                            
                            <input type="password" name="newPassword" className="form-control" required placeholder='enter your new password' onChange={handleChange}
                            value={formData.newPassword}/>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Confirm New Password</label>
                        <div className='input-group'>
                             <span className='input-group-text'>
                                <i className="fas fa-lock-open"></i>
                            </span>


                            <input type="password" name="confirmPassword" className="form-control" required placeholder='confirm your new password' 
                            value={formData.confirmPassword}
                            onChange={handleChange} />
    
                        </div>
                        
                    </div>

                    <button type="submit" className="btn app-btn w-100"><i className="fas fa-key me-2"></i>Change Password</button>
                    
                </form>
                <ToastContainer position="top-center" />
        </div>
  )
}

export default ChangePassword

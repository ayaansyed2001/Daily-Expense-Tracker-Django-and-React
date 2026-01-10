import React,{useState} from 'react'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';



const Signup = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        FullName: "",
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
            const response = await fetch("http://127.0.0.1:8000/api/signup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });
            if(response.status === 201){
                toast.success("Signup successful! You can now log in.");
                setTimeout(() =>{
                    navigate('/login');
                }, 2000);
            }
            else{
                const data = await response.json();
                toast.error(`Signup failed: ${data.message || 'Please try again.'}`);
            }

        }
        catch(error){
            console.error("Error during signup:", error);
            toast.error("Signup failed. Please try again.");

        }
    }
  return (
    <div className='container mt-5'>
        <div className="text-center mb-4">
            <h2><i className="fas fa-user-plus me-2"></i>Sign Up</h2>
            <p className='text-muted'>Create your account to start tracking expenses</p>
            </div>

            <form className='p-4 border rounded mx-auto' style={{maxWidth:"400px"}} 
            onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className='form-label'>Full Name</label>
                    <div className='input-group'>
                        <span className='input-group-text'>
                            <i className="fas fa-user"></i>
                        </span>
                        <input type="text" name='FullName' className="form-control" required placeholder='Enter Your Full Name'
                        onChange={handleChange}
                        value={formData.FullName}/>
                </div>
                </div>

                    
                <div className='mb-3'> 
                    <label className='form-label'>Email</label>
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
                    <div>
                         <span className='input-group-text'>
                            <i className="fas fa-lock"></i>
                        </span>


                        <input type="password" name="Password" className="form-control" required placeholder='create pasword' 
                        value={formData.Password}
                        onChange={handleChange} />

                    </div>
                    
                </div>

                <button type="submit" className="btn btn-primary w-100"><i className="fas fa-user-plus me-2"></i>Sign Up</button>
                
            </form>
            <ToastContainer position="top-center" />
    </div>
  )
}

export default Signup
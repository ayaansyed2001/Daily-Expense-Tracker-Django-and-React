import React from 'react'
import { Link } from 'react-router-dom' ;
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
     const navigate = useNavigate();
 const userId = localStorage.getItem('user_id');

    const handleLogout = () => {
        localStorage.removeItem('user_id');
        navigate('/login');
    };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark app-navbar">
        <div className='container'>
  <Link className="navbar-brand app-brand" to="/"><i className="fas fa-wallet me-2"></i>Expense Tracker</Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto">

      <li className="nav-item active">
        <Link className="nav-link" to="/"><i className="fas fa-home me-2"></i> Home <span className="sr-only">(current)</span></Link>
      </li>

    {userId ? (

<>
 <li className="nav-item">
        <Link className="nav-link" to="/dashboard"> <i className="fas fa-tachometer-alt me-2"></i>DashBoard</Link>
      </li>
            <li className="nav-item">
        <Link className="nav-link" to="/addexpense"> <i className="fas fa-plus me-2"></i>Add Expense</Link>
      </li>
            <li className="nav-item">
        <Link className="nav-link" to="/manageexpense"> <i className="fas fa-file-alt me-2"></i>Manage Expense</Link>
      </li>
            <li className="nav-item">
        <Link className="nav-link" to="/expensereport"> <i className="fas fa-file-alt me-2"></i>Expense Report</Link>
      </li>
            <li className="nav-item">
        <Link className="nav-link" to="/changepassword"> <i className="fas fa-key me-2"></i>Change Password</Link>
      </li>
       <button className="btn logout-btn ms-lg-3 mt-2 mt-lg-0" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt me-2"></i>LogOut

      </button>
      
      
      
      </>

        ): (
<>
<li className="nav-item">
        <Link className="nav-link" to="/signup"> <i className="fas fa-user-plus me-2"></i>SignUp</Link>
      </li>
            <li className="nav-item">
        <Link className="nav-link" to="/login"> <i className="fas fa-sign-in-alt me-2"></i>Login</Link>
      </li>

</>

        )}
      
           

      
    </ul>
   
  </div>
  </div>
</nav>
    
  )
}

export default Navbar

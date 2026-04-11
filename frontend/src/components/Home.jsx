import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
     const userId = localStorage.getItem('user_id');
  return (
    <div className="app-page">
      <div className="home-hero text-center">
        <h1 className="display-5">Expense Tracker</h1>
        <p className="lead">Quickly log and visualise your daily expenses.</p>
        <div className="mt-4">
            {userId ? (
               <>
                <Link to="/dashboard" className="btn app-btn me-2 mb-2"><i className="fas fa-tachometer-alt me-2"></i>Go to Dashboard</Link>
                <Link to="/addexpense" className="btn outline-btn me-2 mb-2"><i className="fas fa-plus me-2"></i>Add Expense</Link>
               

               </>
            ) : (
 <><Link to="/signup" className="btn app-btn me-2 mb-2"><i className="fas fa-user-plus me-2"></i>Sign Up</Link>
 <Link to="/login" className="btn outline-btn mb-2"><i className="fas fa-sign-in-alt me-2"></i> Login</Link>
 </>
            )}

        </div>
      </div>

      <div className="row mt-4 g-4">
        <div className="col-md-4 mb-3">
          <div className="feature-card h-100">
            <i className="fas fa-receipt"></i>
            <h5>Track Expenses</h5>
            <p>Add, edit and remove daily expenses with ease.</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="feature-card h-100">
            <i className="fas fa-chart-pie"></i>
            <h5>Reports</h5>
            <p>View summaries and trends to manage your budget.</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="feature-card h-100">
            <i className="fas fa-shield-alt"></i>
            <h5>Secure</h5>
            <p>Keep your account close and your spending clear.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

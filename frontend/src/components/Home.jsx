import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
     const userId = localStorage.getItem('user_id');
  return (
    <div className="container mt-5">
      <div className="p-5 rounded bg-light text-center">
        <h1 className="display-5">Expense Tracker</h1>
        <p className="lead text-muted">Quickly log and visualise your daily expenses.</p>
        <div className="mt-3">
            {userId ? (
               <>
                <Link to="/dashboard" className="btn btn-success me-2"><i className="fas fa-tachometer-alt me-2"></i>Go to Dashboard</Link>
                <Link to="/addexpense" className="btn btn-primary me-2"><i className="fas fa-plus me-2"></i>Add Expense</Link>
               

               </>
            ) : (
 <><Link to="/signup" className="btn btn-primary me-2"><i className="fas fa-user-plus me-2"></i>Sign Up</Link>
 <Link to="/login" className="btn btn-warning"><i className="fas fa-sign-in-alt me-2"></i> Login</Link>
 </>
            )}

        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <div className="card h-100 p-3">
            <h5>Track Expenses</h5>
            <p className="text-muted">Add, edit and remove daily expenses with ease.</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100 p-3">
            <h5>Reports</h5>
            <p className="text-muted">View summaries and trends to manage your budget.</p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100 p-3">
            <h5>Secure</h5>
            <p className="text-muted">Local-first design; your data is yours.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
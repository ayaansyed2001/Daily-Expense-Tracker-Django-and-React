import React from 'react'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Dashboard from './components/Dashboard.jsx';
import AddExpense from './components/AddExpense.jsx';
import ManageExpense from './components/ManageExpense.jsx';
import ExpenseReport from './components/ExpenseReport.jsx';
import ChangePassword from './components/ChangePassword.jsx';

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/addexpense' element={<AddExpense/>}/>
        <Route path='/manageexpense' element={<ManageExpense/>}/>
        <Route path='/expensereport' element={<ExpenseReport/>}/>
        <Route path='/changepassword' element={<ChangePassword/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
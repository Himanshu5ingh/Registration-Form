import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Header from './components/Header'
import Form from './Form'
import Fetch from './components/Fetch'
import Update from './components/Update'
import AdminRegister from './components/Admin/AdminRegister'
import AdminLogin from './components/Admin/AdminLogin'
import Private from './components/Private'
function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route element={<Private/>}>
          <Route path="/fetch" element={<Fetch/>}></Route>
          <Route path="/update/:id" element={<Update/>}></Route>
        </Route>
        <Route path="/" element={<h1>Home Page</h1>}></Route>
        <Route path="/sign-up" element={<Form/>}></Route>
        <Route path="/admin-register" element={<AdminRegister/>}></Route>
        <Route path="/admin-login" element={<AdminLogin/>}></Route>
        <Route path='*' element={<h1>Page not Found</h1>}/>
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
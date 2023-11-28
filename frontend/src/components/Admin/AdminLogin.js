import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
const AdminLogin = () => {
    const navigate=useNavigate()
    const [detail, setdetail] = useState({  email: '', password: '' })

    const handling = (e) => {
        setdetail({ ...detail, [e.target.name]: e.target.value })
    }

    const handlesubmit = (e) => {
        e.preventDefault();

        const {  email, password} = detail
        if (password && email) {
            fetch('http://localhost:5000/admin-login', {
                method: 'POST',
                body: JSON.stringify({  email, password }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => {
                     console.log(json)
                     if(json.userEmail){
                        sessionStorage.setItem("email",json.userEmail.email)
                        sessionStorage.setItem("token",json.token)
                         alert(json.message)
                        navigate("/fetch")
                        setdetail({ email: '', password: '' })
                     }
                   else{
                    alert(json.message)
                   }

                }).catch(() => console.log('Api call error'))

        }
        else {
            alert("All field is required")
        }

    }

    return (
        <div className='contanier'>
            <div className='row'>

                <div className='col-lg-8 col-md-8 col-sm-8 mx-auto'>


                    <h1 className='form'>Admin Login Here</h1>
                    <form onSubmit={handlesubmit}>
                       
                        <div className='detail'>
                            <input type='email' className='form-control my-3' name='email' onChange={handling}
                                value={detail.email} placeholder='Your email...' />

                        </div>
                      
                        <div className='detail'>
                            <input type='password' className='form-control my-3' name='password' onChange={handling}
                                value={detail.password} placeholder='Your password...' />

                        </div>
                                            

                        <button type='submit' className='btn btn-danger'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin
import React, { useState } from 'react'


const AdminRegister = () => {
    const [detail, setdetail] = useState({ name: '', email: '', password: '', conpassword: '' })

    const handling = (e) => {
        setdetail({ ...detail, [e.target.name]: e.target.value })
    }

    const handlesubmit = (e) => {
        e.preventDefault();

        const { name, email, password, conpassword } = detail
        if (password === conpassword) {
            fetch('http://localhost:5000/admin-register', {
                method: 'POST',
                body: JSON.stringify({ name, email, password, conpassword }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    // console.log(json)
                    alert(json.message)
                    setdetail({ name: '', email: '', password: '', conpassword: '' })

                }).catch(() => console.log('Api call error'))

        }
        else {
            alert("Your password and conpassword is not match")
        }

    }

    return (
        <div className='contanier'>
            <div className='row'>

                <div className='col-lg-8 col-md-8 col-sm-8 mx-auto'>


                    <h1 className='form'>Admin Register Here</h1>
                    <form onSubmit={handlesubmit}>
                        <div className='detail'>
                            <input type='text' className='form-control my-3' name='name' onChange={handling}
                                value={detail.name} placeholder='Your name...' />

                        </div>
                        <div className='detail'>
                            <input type='email' className='form-control my-3' name='email' onChange={handling}
                                value={detail.email} placeholder='Your email...' />

                        </div>
                      
                        <div className='detail'>
                            <input type='password' className='form-control my-3' name='password' onChange={handling}
                                value={detail.password} placeholder='Your password...' />

                        </div>
                        <div className='detail'>
                            <input type='password' name='conpassword' className='form-control my-3' onChange={handling}
                                value={detail.conpassword} placeholder='Confirm password...' />

                        </div>
                       

                        <button type='submit' className='btn btn-danger'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminRegister
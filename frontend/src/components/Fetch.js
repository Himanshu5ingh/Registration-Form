import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
function Fetch() {
    const [data, setData] = useState([])
    useEffect(() => {
        getData();
    }, [])
    const getData=()=>{
        fetch('http://localhost:5000/fetch')
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setData(json)
            })
            .catch(err=>console.log(err))
    }
    const deleteData=async(id)=>{
       // console.log(id)
       let del= await fetch(`http://localhost:5000/delete/${id}`, {
        method: 'DELETE',
        });
        if(del){
            getData()
        }
    }
    return (
       <>
       <div className='contanier my-5'>
            <div className='row'>

                <div className='col-lg-8 col-md-8 col-sm-8 mx-auto'>
       <table className='table'>
        <thead>
        <tr>
            <th>Sr NO.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
       {
        data.map((val,ind)=>
        <tr key={ind}>
            <td>{ind+1}</td>
            <td>{val.name}</td>
            <td>{val.email}</td>
            <td>{val.mobile}</td>
            <td>{val.address}</td>
            <td>
                <button className='btn btn-danger' onClick={()=>deleteData(val._id)}>Delete</button>
                <Link to={`/update/${val._id}`}><button className='btn btn-warning'>Update</button></Link>
            </td>
        </tr>
        
        )
       }
      </tbody>
       </table>
       </div>
       </div>
       </div>
       </>
    )
}

export default Fetch
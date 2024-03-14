import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation,
            })
        });
        const json=await response.json();
        console.log(json);

        if(!json.success){
            alert("Enter valid credentials");
        }
    }
    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <div className='container bg-primary'>
            <form onSubmit={handleSubmit}>
                <div className="form-group mt-2">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name='name' value={credentials.name} onChange={handleChange} placeholder='Enter Name' />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text" style={{color:"white"}}>We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={handleChange} id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="name">Address</label>
                    <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={handleChange} placeholder='Enter your address' />
                </div>
                <button type="submit" className="btn btn-success m-2">Submit</button>
                <Link to="/login" className='btn btn-danger m-2'>Already a user</Link>
            </form>
        </div>
    )
}

import React from 'react'

import { Link,useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate=useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem("authToken");
        navigate("/");
    }



    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand fst-italic fs-3" to="/">Food Panda</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mt-1">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to="/">My Orders</Link>
                                </li>
                            :""}

                        </ul>
                        {(!localStorage.getItem("authToken")) ?
                        <div className="d-flex">
                            <Link className="btn bg-white text-danger mx-1" to="/login">Login</Link>
                            <Link className="btn bg-white text-danger mx-1" to="/createuser">SignUp</Link>
                        </div>
                        :<>
                        <div className="btn bg-white text-primary mx-1">My Cart</div>
                        <div className="btn bg-white text-danger mx-1" onClick={handleLogout} >
                            Logout
                        </div>
                        </>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

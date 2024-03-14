import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({email: "", password: ""})
  let navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            })
        });
        const json=await response.json();
        console.log(json);

        if(!json.success){
            alert("Enter valid credentials");
        }

        if(json.success){
          localStorage.setItem("authToken",json.authToken);
          navigate("/");
      }
    }
    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

  return (
    <div>
      <div className='container bg-primary'>
            <form onSubmit={handleSubmit}>
                <div className="form-group mt-2">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} onChange={handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text" style={{color:"white"}}>We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={handleChange} id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-success m-2">Submit</button>
                <Link to="/createuser" className='btn btn-danger m-2'>New user</Link>
            </form>
        </div>
    </div>
  )
}

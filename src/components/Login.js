import React ,{useState}from 'react'
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const [creadentials, setCreadentials] = useState({email: "", password: ""})
    let navigate=useNavigate();

    const handlelogin =async (e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/auth/login"  , {
            method:'POST',
            headers:{
                'content-type':'application/json',
            },
            body:JSON.stringify({email: creadentials.email ,password: creadentials.password})
        })
       const json=await response.json();
       console.log(json)
       if (json.success){
            localStorage.setItem('token',json.authtoken);
            props.showAlert("successfully logged","success")
            navigate("/");  
       }
       else{
          props.showAlert("Invalid crendentials","warning")
       }
    }
    const onChange=(e)=>{
        e.preventDefault();
      setCreadentials({...creadentials,[e.target.name]:e.target.value})
      }
  return (
    <div>
     <form>
      <h2>Login to continue with iNotebook</h2>
    <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-control" id="email" value={creadentials.email} onChange={onChange} name='email' aria-describedby="emailHelp"/>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" value={creadentials.password} onChange={onChange} name='password'/>
      </div>
      <button type="submit" className="btn btn-primary" onClick={handlelogin}>Submit</button>
    </form> 
    </div>
  )
}

export default Login

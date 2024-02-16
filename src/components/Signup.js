import React ,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
  const [creadentials, setCreadentials] = useState({name: "", email: "", password: "", cpassword: ""})
  let navigate=useNavigate();
  const handlesignup =async (e)=>{
    e.preventDefault();
    const {name,email,password}=creadentials;
      const response=await fetch("http://localhost:5000/auth/createuser"  , {
          method:'POST',
          headers:{
              'content-type':'application/json'
          },
          body:JSON.stringify({name,email,password})
      })
     const json=await response.json();
     console.log(json)
     if (json.success){
          localStorage.setItem('token',json.authtoken);
          navigate("/");
          props.showAlert("signup successfully","success")
     }
     else{
        props.showAlert("Invalid creadentials","info")
     }
  }
  const onChange=(e)=>{
      e.preventDefault();
    setCreadentials({...creadentials,[e.target.name]:e.target.value})
    }
  return (
    <div className='container'>
      <form>
        <h2>Creating an account for iNotebook</h2>
        <div className="mb-3 my-2">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={creadentials.name}onChange={onChange} name='name' aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={creadentials.email}onChange={onChange} name='email' aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password"value={creadentials.password} onChange={onChange} name='password' />
        </div>
        <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="cpassword" value={creadentials.cpassword}onChange={onChange} name='cpassword'/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handlesignup}>Submit</button>
      </form>
    </div>
  )
}

export default Signup

import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  })
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = e => {
    setInputs( prev=>({...prev, [e.target.name]: e.target.value}) )
  }

  const handleSubmit = async e => {
    e.preventDefault();

    try{
      await axios.post("/auth/login", inputs);
      navigate("/");
    }catch(err){
      setError(err.response.data);
    }
    
  }


  return (
    <div className='auth'>
        <h1>Login</h1>
        <form>
            <input type="text" placeholder='username' onChange={handleChange} name='username' required />
            <input type="password" placeholder='password' onChange={handleChange} name='password' required />
            <button onClick={handleSubmit}>Login</button>
            {err && <p>{err}</p>}
            <span>Don't have an account? <Link to="/register">Sign up</Link></span>
        </form>
    </div>
  )
}

export default Login
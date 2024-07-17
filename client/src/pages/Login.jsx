import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  })
  

  const navigate = useNavigate();

  const {login} = useContext(AuthContext);
  
  const handleChange = e => {
    setInputs( prev=>({...prev, [e.target.name]: e.target.value}) )
  }

  const handleSubmit = async e => {
    e.preventDefault();

    if (!inputs.username.trim()) {
      toast.error('Username is required!');
      return;
    }

    if (!inputs.password.trim()) {
      toast.error('Password is required!');
      return;
    }

    try{
      await login(inputs);
      toast.success('Login Successful!');
      navigate("/");
    }catch(err){
      if (err.response.status === 400 || err.response.status === 404 ) {
        toast.error('Invalid username or password!');
      } else {
        toast.error('Something went wrong!');
      }
    }
    
  }


  return (
    <div className='auth'>
        <h1>Login</h1>
        <form>
            <input type="text" placeholder='username' onChange={handleChange} name='username' required />
            <input type="password" placeholder='password' onChange={handleChange} name='password' required />
            <button onClick={handleSubmit}>Login</button>
            <span>Don't have an account? <Link to="/register">Sign up</Link></span>
        </form>
    </div>
  )
}

export default Login
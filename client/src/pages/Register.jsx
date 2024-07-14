import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [err, setError] = useState(null);

  const handleChange = e => {
    setInputs( prev=>({...prev, [e.target.name]: e.target.value}) )
  }

  const handleSubmit = async e => {
    e.preventDefault();

    try{
      const res = await axios.post("/auth/register", inputs);
      console.log(res);
    }catch(err){
      setError(err.response.data);
    }
    
  }
  
  return (
    <div className='auth'>
        <h1>Register</h1>
        <form>
            <input type="text" placeholder='username' name='username' onChange={handleChange} required/>
            <input type="email" placeholder='email' name='email' onChange={handleChange} required/>
            <input type="password" placeholder='password' name='password' onChange={handleChange} required/>
            <button onClick={handleSubmit}>Register</button>
            {err && <p>{err}!</p>}
            <span>Already have an account? <Link to="/login">Sign in</Link></span>
        </form>
    </div>
  )
}

export default Register
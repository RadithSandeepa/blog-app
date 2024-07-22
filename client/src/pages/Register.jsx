import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Profile from '../img/profile.png'
import axios from 'axios'
import toast from 'react-hot-toast';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    img: null
  })
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState(null);
 
  const navigate = useNavigate();

  const upload = async () => {

    try{
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/upload', formData);
      return res.data;
    }catch(err){
      console.log(err);
    }
  }

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleChange = e => {
    setInputs( prev=>({...prev, [e.target.name]: e.target.value}) )
  }

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!inputs.username.trim()) {
      toast.error('Username is required!');
      return;
    }

    if (!inputs.email.trim()) {
      toast.error('Email is required!');
      return;
    }

    if (!isValidEmail(inputs.email)) {
      toast.error('Invalid email format!');
      return;
    }

    if (!inputs.password.trim()) {
      toast.error('Password is required!');
      return;
    }

    let img = '';
    if (file) {
      img= await upload();
    }

    try{
      await axios.post("/auth/register", { ...inputs, img });
      toast.success('User registered successfully!');
      navigate("/login");
    }catch(err){
      if (err.response.status === 409 ) {
        toast.error('User already exists!');
      } else {
        toast.error('Something went wrong!');
      }
    }
    
  }
  
  return (
    <div className='auth'>
        <h1>Register</h1>
        <form>
            <div className="img-Container">
            <label htmlFor="file">
              <img
                src={preview ? preview : Profile}
                alt=""
                style={{ cursor: 'pointer' }}
              />
            </label>
            <input
              type="file"
              id="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            </div>
            <input type="text" placeholder='username' name='username' onChange={handleChange} required/>
            <input type="email" placeholder='email' name='email' onChange={handleChange} required/>
            <input type="password" placeholder='password' name='password' onChange={handleChange} required/>
            <button onClick={handleSubmit}>Register</button>
            <span>Already have an account? <Link to="/login">Sign in</Link></span>
        </form>
    </div>
  )
}

export default Register
import React, { useContext, useEffect, useState } from 'react';
import Menu from '../components/Menu';
import ProfilePic from '../img/profile.png'
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { logout } = useContext(AuthContext);

  const [user, setUser] = useState({
    username: '',
    email: '',
    img: '',
  });
  const [newPassword, setNewPassword] = useState('');
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState(null);
 
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get('/users/');
        setUser({
          username: res.data.username,
          email: res.data.email,
          img: res.data.img ? res.data.img : '',
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserDetails();
  }, []);

  const navigate = useNavigate();

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

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

  const handleDelete = async () => {
    try {
      await axios.delete('/users/');
      logout();
      navigate("/");
      toast.success("Account deleted successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const handlePasswordUpdate = async () => {

    if (!newPassword.trim()) {
      toast.error("New password cannot be empty!");
      return;
    }

    try {
      await axios.put('/users/changepassword', { newPassword });
      toast.success("Password updated successfully!");
      setNewPassword('');
    } catch (err) {
      console.log(err);
      toast.error("Failed to update password!");
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailPattern.test(email);
  };

  const handleUpdate = async () => {
   
    if (!user.email.trim()) {
      toast.error('Email is required!');
      return;
    }

    if (!isValidEmail(user.email)) {
      toast.error('Invalid email format!');
      return;
    }

    let img = user.img;
    if (file) {
      img = await upload();
    }

    try {
      await axios.put('/users/', {
        username: user.username,
        email: user.email,
        img
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile!");
    }
  };

  return (
    <div className='profile'>
      <div className="left">
        <div className="form">
          <h1>Account Information</h1>
          <div className="item-container">
            <div className="img">
              <label htmlFor="file">
                <img
                  src={preview ? preview : (user.img ? `../upload/${user.img}` : ProfilePic)}
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
            <div className="form-right">
            <div className="item">
              <span>Username : </span>
              <input type="text" placeholder='Username' className='username' value={user.username} disabled/>
            </div>
            <div className="item">
              <span>E-mail : </span>
              <input type="email" placeholder='Email' value={user.email} onChange={e => setUser({ ...user, email: e.target.value })}/>
            </div>
            <div className="btn-container">
              <button className='edit' onClick={handleUpdate}>Update</button>
              <button className='delete' onClick={handleDelete}>Delete</button>
            </div> 
            </div>
          </div>
        </div>
        <div className="password-reset">
          <h1>Reset Password</h1>
          <input type="password" placeholder="Enter New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
          <button onClick={handlePasswordUpdate}>Update</button>
        </div>
      </div>
      <div className="right">
        <Menu isMyPosts={true}/>
      </div>
    </div>
  )
}

export default Profile;
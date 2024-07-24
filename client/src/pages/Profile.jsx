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

  const handleDelete = async () => {
    try {
      const res = await axios.delete('/users/');
      logout();
      navigate("/");
      toast.success("Account deleted successfully!");
    } catch (err) {
      console.log(err);
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
                  src={user.img ? `../upload/${user.img}` : ProfilePic}
                  alt=""
                  style={{ cursor: 'pointer' }}
                />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: 'none' }}
                // onChange={handleFileChange}
              />
            </div>
            <div className="form-right">
            <div className="item">
              <span>Username : </span>
              <input type="text" placeholder='Username' className='username' value={user.username} disabled/>
            </div>
            <div className="item">
              <span>E-mail : </span>
              <input type="email" placeholder='Email' value={user.email}/>
            </div>
            <div className="btn-container">
              <button className='edit'>Update</button>
              <button className='delete' onClick={handleDelete}>Delete</button>
            </div> 
            </div>
          </div>
        </div>
        <div className="password-reset">
          <h1>Reset Password</h1>
          <input type="password" placeholder="Enter New Password" />
          <button>Update</button>
        </div>
      </div>
      <div className="right">
        <Menu isMyPosts={true}/>
      </div>
    </div>
  )
}

export default Profile;
import React from 'react';
import ProfilePic from '../img/profile.png'

const Profile = () => {
  return (
    <div className='profile'>
      <div className="left">
        <div className="img">
            <label htmlFor="file">
              <img
                src={ProfilePic}
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
        <div className="password-reset">
          <h1>Reset Password</h1>
          <input type="password" placeholder="Password" />
          <button>Update</button>
        </div>
      </div>
      <div className="form">
        <h1>Account Information</h1>
        <div className="item">
          <span>Username : </span>
          <input type="text" placeholder='Username' />
        </div>
        <div className="item">
        <span>E-mail : </span>
          <input type="email" placeholder='Email' />
        </div>
        <button>Update</button>
      </div>
    </div>
  )
}

export default Profile;
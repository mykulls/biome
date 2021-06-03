import React from 'react';
import './Profile.css';

function Profile() {
  document.title = 'Biome | Profile';

  return (
    <div className="container">
      <div className="profile-header">
        <div className="profile-img">
          <img src="https://sahabatperubahan.com/wp-content/uploads/2021/03/placeholder-profile-sq.jpg" width="200" alt="" />
        </div>
        <div className="profile-nav-info">
          <h3 className="user-name"> John Doe </h3>
          <div className="address">
            <p className="state"> Los Angeles, </p>
            <span className="city">California</span>
          </div>
        </div>
      </div>
      <div className="main-bd">
        <div className="left-side">
          <div className="profile-side">
            <h1> Personal Information </h1>
            <h2> Phone Number </h2>
            <p className="mobile-no">
              +0912341234
            </p>
            <h2> Email </h2>
            <p className="user-mail">
              JohnDoe@gmail.com
            </p>
          </div>
        </div>
        <div className="right-side">
          <div className="nav">
            <ul>
              <li className="user-post active">
                Posts
              </li>
            </ul>
          </div>
          <div className="profile-body">
            <div className="profile-posts tab">
              <h1> </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

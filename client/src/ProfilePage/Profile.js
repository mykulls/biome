import React from 'react';
import './Profile.css';

function Profile() {
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
            <p className="mobile-no">
              +0912341234
            </p>
            <p className="user-mail">
              JohnDoe@gmail.com
            </p>
            <div className="user-bio">
              <h3> Bio </h3>
              <p className="bio"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </p>
            </div>
            <h3> Rating </h3>
            <div className="user-rating">
              <h3 className="rating"> 4.5 </h3>
            </div>
          </div>
        </div>
        <div className="right-side">
          <div className="nav">
            <ul>
              <li className="user-post active">
                Posts
              </li>
              <li className="user-review">
                Reviews
              </li>
            </ul>
          </div>
          <div className="profile-body">
            <div className="profile-posts tab">
              <h1> </h1>
            </div>
            <div className="profile-review tab">
              <h1> </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

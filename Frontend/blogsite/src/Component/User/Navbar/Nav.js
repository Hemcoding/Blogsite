import React, { useState } from 'react';
import './Navbar.scss';

const NavBar = () => {

return (
  <>
    <nav className='nav'>
    <div className="Container">
      <div className='sub-Container'>
        <div className="navbar-brand">
          <h2 href="/">Blogsite</h2>
        </div>
          <ul className="navbar-links">
            <li>
              <h4><a className="link" to="/home">Home</a></h4>
            </li>
            <li>
              <h4><a className="link" to="/categories">Categories</a></h4>
            </li>
            <li>
              <h4><a className="link" to="/about">About</a></h4>
            </li>
            <li>
              <h4><a className="link" to="/contact">Contact</a></h4>
            </li>
          </ul>
          </div>
          <div className='user-profile'>
          <p>Hemanshu Parmar</p>
          <img className="user-img" src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'/>
          </div>
       
        </div>
    </nav>
  </>
)

};

export default NavBar;

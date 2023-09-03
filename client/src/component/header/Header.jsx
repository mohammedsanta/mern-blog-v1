import React, { useContext, useEffect, useState } from 'react';
import './header.css';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../userContext/UserContext';

const Header = () => {

  const {setUserInfo,userInfo} = useContext(UserContext);

  // check usename logoedin or not

  useEffect(() => {
    fetch('http://localhost:4000/profile',{
      credentials: 'include',
    })
    .then(response => {
      response.json()
        .then(userInfo => {
          setUserInfo(userInfo);
        });
    });

  },[]);

  const logout = () => {
    fetch('http://localhost:4000/logout',{
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (

    <main>

      <header>

          <Link to="" className="logo">MyBlog</Link>

          <nav>

            { username && (
              <>
                <Link to="/create">Create Post</Link>
                <a onClick={logout}>Logout</a>
              </>
            ) }

            { !username && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            ) }

          </nav>

      </header>

      <Outlet />
      
    </main>

  )
}

export default Header;
import React, { useState } from 'react';
import './auth.css';

const Register = () => {

  const [ username,setUsername ] = useState('');
  const [ password,setPassword ] = useState('');

  const register = async (e) => {
    e.preventDefault()

    const registerFetch = await fetch('http://localhost:4000/register',{
      method: "POST",
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'}
    })

    if(registerFetch.status === 200) {
      alert('Register Has been Successfully');
    } else {
      alert('Register Hasn\'t been Successfully');
    }

  }

  return (
    <form className="register" onSubmit={register}>

      <h1>Register</h1>

      <input type="text"
        placeholder='Username'
        value={username}
        onChange={e => setUsername(e.target.value)}
        />
      <input 
        type="password" 
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        />

      <button type="submit">Register</button>

    </form>
  )
}

export default Register;
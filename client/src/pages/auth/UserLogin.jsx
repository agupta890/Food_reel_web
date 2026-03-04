import React, { useState } from "react";
import "../../styles/auth-shared.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const UserLogin = () => {
  const navigate = useNavigate();
  const Base_URL = import.meta.env.VITE_API_URL
  const [user, setUser] = useState({
    email:"",
    password:""
  })
  // handle onchange inputs
  const handleChange = (e)=>{
    const {name,value} = e.target;
    setUser(prev=>({...prev,[name]:value}))
  }
  // form submission with api
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const response = await axios.post(`${Base_URL}/auth/user/login`,user,
        {withCredentials:true}
      )
      console.log(response.data)
      setUser({
        email:"",
        password:""
      })
      navigate("/")
    } catch (error) {
      console.log(`there is an error in login`,error?.reponse?.data?.message)
    }
    
  }

  return (
    <div className="auth-page-wrapper">
      <div
        className="auth-card"
        role="region"
        aria-labelledby="user-login-title"
      >
        <header>
          <h1 id="user-login-title" className="auth-title">
            Welcome back
          </h1>
          <p className="auth-subtitle">
            Sign in to continue your food journey.
          </p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <button className="auth-submit" type="submit">
            Sign In
          </button>
        </form>
        <div className="auth-alt-action">
          New here? <a href="/user/register">Create account</a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

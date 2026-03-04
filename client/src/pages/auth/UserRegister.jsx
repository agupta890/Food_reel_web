import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/auth-shared.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const UserRegister = () => {
  const navigate = useNavigate();
  const Base_URL = import.meta.env.VITE_API_URL
  const [user, setUser] = useState({
    fullName:"",
    email:"",
    password:""
  })
//   handle onchange inputs
const handleChange =(e)=>{
const {name,value} = e.target;
setUser(prev=>({...prev,[name]:value}))
}
// handle form submission with api 
const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
        const response = await axios.post(`${Base_URL}/auth/user/register`,user,
            {withCredentials:true}
        )
        console.log(response.data)
        navigate('/')
    } catch (error) {
        console.log('there is an error in register', error?.response?.data?.message)
    }
}
  return (
    <div className="auth-page-wrapper">
      <div
        className="auth-card"
        role="region"
        aria-labelledby="user-register-title"
      >
        <header>
          <h1 id="user-register-title" className="auth-title">
            Create your account
          </h1>
          <p className="auth-subtitle">
            Join to explore and enjoy delicious meals.
          </p>
        </header>
        <nav className="auth-alt-action" style={{ marginTop: "-4px" }}>
          <strong style={{ fontWeight: 600 }}>Switch:</strong>{" "}
          <Link to="/user/register">User</Link> •{" "}
          <Link to="/food-partner/register">Food partner</Link>
        </nav>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="two-col">
            <div className="field-group">
              <label htmlFor="firstName">FULL Name</label>
              <input
                id="firstName"
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
                placeholder="Jane Doe"
                autoComplete="given-name"
              />
            </div>
            
          </div>
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
              autoComplete="new-password"
            />
          </div>
          <button className="auth-submit" type="submit">
            Sign Up
          </button>
        </form>
        <div className="auth-alt-action">
          Already have an account? <Link to="/user/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;

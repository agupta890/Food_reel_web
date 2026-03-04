import React, { useState } from "react";
import "../../styles/auth-shared.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FoodPartnerLogin = () => {
  const Base_URL = import.meta.env.VITE_API_URL
  const navigate = useNavigate();
  const [partner, setPartner] = useState({
    email: "",
    password: "",
  });

  // handle onchange inputs field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartner((prev) => ({ ...prev, [name]: value }));
  };

  // handle for submit with api
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Base_URL}/auth/food-partner/login`,partner,
        {withCredentials:true}
      )
      console.log(response.data)
      setPartner({
        email:"",
        password:""
      })
      navigate('/create-food')
    } catch (error) {
      console.error("There was an error login!", error?.response?.data?.message);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div
        className="auth-card"
        role="region"
        aria-labelledby="partner-login-title"
      >
        <header>
          <h1 id="partner-login-title" className="auth-title">
            Partner login
          </h1>
          <p className="auth-subtitle">
            Access your dashboard and manage orders.
          </p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              value={partner.email}
              onChange={handleChange}
              type="email"
              placeholder="business@example.com"
              autoComplete="email"
            />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              value={partner.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>
          <button className="auth-submit" type="submit">
            Sign In
          </button>
        </form>
        <div className="auth-alt-action">
          New partner? <a href="/food-partner/register">Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;

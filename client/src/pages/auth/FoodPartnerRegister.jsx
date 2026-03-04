import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/auth-shared.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const FoodPartnerRegister = () => {
  const Base_Url = import.meta.env.VITE_API_URL
  const navigate = useNavigate();

  // TODO: Implement form state management and submission logic
  const [partner, setPartner] = useState({
    name: "",
    contactName:"",
    phone: "",
    email:"",
    password: "",
    address: "",
  })

  // handle the form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartner(prev=>({...prev,[name]:value}))
  }

  // handle form submission with register api
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const response = await axios.post(`${Base_Url}/auth/food-partner/register`,partner,
        { withCredentials: true }
      )
      console.log(response.data)
  
      setPartner({name: "",
       contactName:"",
       phone: "",
       email:"",
       password: "",
       address: "",})
        navigate("/food-partner/login");
       
      
    } catch (error) {
       console.error("There was an error registering!", error);
      
    }
  }

  return (
    <div className="auth-page-wrapper">
      <div
        className="auth-card"
        role="region"
        aria-labelledby="partner-register-title"
      >
        <header>
          <h1 id="partner-register-title" className="auth-title">
            Partner sign up
          </h1>
          <p className="auth-subtitle">Grow your business with our platform.</p>
        </header>
        <nav className="auth-alt-action" style={{ marginTop: "-4px" }}>
          <strong style={{ fontWeight: 600 }}>Switch:</strong>{" "}
          <Link to="/user/register">User</Link> •{" "}
          <Link to="/food-partner/register">Food partner</Link>
        </nav>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="businessName">Business Name</label>
            <input
              id="businessName"
              name="name"
              value={partner.name}
              placeholder="Tasty Bites"
              autoComplete="organization"
              onChange={handleChange}
            />
          </div>
          <div className="two-col">
            <div className="field-group">
              <label htmlFor="contactName">Contact Name</label>
              <input
                id="contactName"
                name="contactName"
                value={partner.contactName}
                placeholder="Jane Doe"
                autoComplete="name"
                 onChange={handleChange}
              />
            </div>
            <div className="field-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                value={partner.phone
                }
                placeholder="+1 555 123 4567"
                autoComplete="tel"
                 onChange={handleChange}
              />
            </div>
          </div>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={partner.email}
              placeholder="business@example.com"
              autoComplete="email"
               onChange={handleChange}
            />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={partner.password}
              placeholder="Create password"
              autoComplete="new-password"
               onChange={handleChange}
            />
          </div>
          <div className="field-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              value={partner.address}
              placeholder="123 Market Street"
              autoComplete="street-address"
               onChange={handleChange}
            />
            <p className="small-note">
              Full address helps customers find you faster.
            </p>
          </div>
          <button className="auth-submit" type="submit">
            Create Partner Account
          </button>
        </form>
        <div className="auth-alt-action">
          Already a partner? <Link to="/food-partner/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;

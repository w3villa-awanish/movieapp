import React, { useEffect, useState } from "react";
import "./signin.scss";
import { NavLink, useNavigate } from "react-router-dom";


function Signin() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [response, setResponse] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear validation error when the user starts typing
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (newErrors.email || newErrors.password) {
      // If there are validation errors, update the state and return
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        // Save the token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', formData.email);
        setResponse('Login successful:', data);
        setFormData({
          email: '',
          password: '',
        });
        navigate('/')
        // You can handle successful login, e.g., store user token in state or localStorage
      } else {
        console.error('Login failed:', response.statusText);
        setResponse('Login failed:', response);
        // You can handle failed login, e.g., display an error message
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token') ) {
      navigate('/')
     }
  }, [navigate]);

  return (
    <>
      <div className="signin">
        <div className="section_3 grey_bg padding40">
          <div className="container">
            <div className="row">
              <div className="col-md-4">


              </div>
              <div className="col-md-4">
                <div className="signform"
                >
                  <h4>Sign In Movie App</h4>
                  <form onSubmit={handleSubmit}>
                    <label>
                      Email:</label>
                    <div className="form-group">
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}

                      />
                      <span style={{ color: 'red' }}>{errors.email}</span>
                    </div>
                    <label>
                      Password: </label>
                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}

                      />
                      <span style={{ color: 'red' }}>{errors.password}</span>
                    </div>
                    <br></br>
                    <div className="form-group">
                    <button type="submit">Login</button>
                    </div>
                    <span style={{ color: 'green' }}>{response}</span>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;

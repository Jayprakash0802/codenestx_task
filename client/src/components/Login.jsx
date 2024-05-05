import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './context';

export default function Login() {
  const [admin, setAdmin] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const {setCurrUser } = useContext(UserContext);

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, admin);
      console.log(response.data);
      const token = response?.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        setCurrUser(admin.username);
        navigate('/');
      } else {
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={admin.username}
          onChange={changeInputHandler}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={admin.password}
          onChange={changeInputHandler}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const initialvalue = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const [inputs, setInputs] = useState(initialvalue);
  const [error, setError] = useState(null);

  const { username, email, password } = inputs;

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/auth/register",
        inputs
      );
      console.log(res);

      if (res.data.status === 401) {
        throw new Error(res.data.message);
      }
      window.location.href = "/login";
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="auth">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="username"
          onChange={handleChange}
          value={username}
          name="username"
        />
        <input
          required
          type="email"
          placeholder="email address"
          onChange={handleChange}
          value={email}
          name="email"
        />
        <input
          required
          type="password"
          placeholder="password"
          onChange={handleChange}
          value={password}
          name="password"
        />
        <input type="submit" />
        {error && <p>{error}</p>}
        <span>
          Do you have an account?
          <Link to={"/login"}>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;

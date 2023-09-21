import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/authContext";

const initialvalue = {
  username: "",
  password: "",
};

const Login = () => {
  const [inputs, setInputs] = useState(initialvalue);
  const [error, setError] = useState(null);

  const { username, password } = inputs;

  const { login } = useContext(AuthContext);

  function handleChange(e) {
    setError(null);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(inputs);
      window.location.href = "/";
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          value={username}
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <input type="submit" />
        {error && <p>{error}</p>}
        <span>
          Don't you have an account?
          <Link to={"/register"}>Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;

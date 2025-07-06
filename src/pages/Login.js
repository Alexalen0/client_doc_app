import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import "../inputIcon.css";
import "../styles/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    alert("Demo credentials:\nUsername: asd\nPassword: asd123");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`,
        {
          username,
          password,
        }
      );
      login(res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-center-container">
      <form onSubmit={handleSubmit} className="card login-form">
        <h2 style={{ color: "#ffd700", marginBottom: "1.5rem" }}>Login</h2>
        <div className="input-icon-group">
          <FaUser className="input-icon" />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="input-icon-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button
          type="submit"
          className="btn"
          style={{ width: "100%", marginTop: "1rem" }}
        >
          Login
        </button>
        <div style={{ marginTop: "1rem" }}>
          <a href="/register" className="App-link">
            Don't have an account? Register
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;

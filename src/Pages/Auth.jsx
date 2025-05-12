// src/components/Auth.js
import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jobseaker } from "../assets";
import "../components/Styles/Auth.css";
import { useAuth } from "../components/Hooks/Context";

function Auth() {
  const { login, loading, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (user) {
    navigate("/dashboard");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(""); // Clear previous errors
      await login(email, password); // Try logging in with Firebase
      navigate("/dashboard"); // Redirect to dashboard on success
    } catch (err) {
      setError(err.message); // Set error message on failure
    }
  };

  return (
    <div className="authContainer">
      <div>
        <img src={jobseaker} alt="" />
        <h1>Admin</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="formInput">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            required
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formInput">
          <label htmlFor="password">Password:</label>
          <div className="passwordinput">
            <input
              type="password"
              placeholder="******"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Auth;

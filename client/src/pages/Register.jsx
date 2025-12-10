import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const nav = useNavigate();
  const { register, setErr, err } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      await register(form.name.trim(), form.email.trim(), form.password);
      nav("/account");
    } catch (ex) {
      alert(ex?.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 480, margin: "2rem auto" }}>
      <h2>Create an account</h2>
      {err && <p className="error">{err}</p>}
      <form onSubmit={onSubmit}>
        <label className="d-block mb-2">
          Username
          <input
            type="text"
            placeholder="newuser123"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </label>
        <label className="d-block mb-2">
          Email
          <input
            type="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </label>
        <label className="d-block mb-2">
          Password
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              aria-describedby="passwordHelpBlock"
              value={form.password}
              minLength={6}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              style={{ paddingRight: "2rem" }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: "absolute", right: "0.5rem", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div id="passwordHelpBlock" className=" mt-1 help">
            Your password must be at least 6 characters long.
          </div>
        </label>
        <div className="mt-3">
          <button disabled={busy} type="submit">
            {busy ? "Creating…" : "Create account"}
          </button>
        </div>
      </form>
    </div>
  );
}

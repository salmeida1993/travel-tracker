import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Home() {
  const { user } = useAuth();

  return (
    <section className="home">
      <div className="home-hero">
        <h1 className="home-title">Plan. Explore. Remember.</h1>
        <p className="home-subtitle">
          Track the states you’ve visited, map your next trip, and keep all your travel memories in one place.
        </p>

        <div className="home-cta">
          <Link className="btn btn-lg primary" to="/states">Browse States</Link>
          {user ? (
            <>
              <Link className="btn btn-lg" to="/mytrip">Track your trips</Link>
            </>
          ) : (
            <>
              <Link className="btn btn-lg" to="/register">Create Account</Link>
              <Link className="btn btn-lg" to="/login">Sign In</Link>
            </>
          )}
        </div>
      </div>

      <div className="home-features">
        <div className="feature-card">
          <h3>Auto-update Map</h3>
          <p>Visibly keep track of where you've been on an interactive map.</p>
        </div>
        <div className="feature-card">
          <h3>Trip Tracker</h3>
          <p>Track multi-city routes, dates, budgets, and notes—keep it all organized.</p>
        </div>

      </div>
    </section>
  );
}

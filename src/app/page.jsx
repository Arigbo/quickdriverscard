import React from 'react';
import { LogIn, UserPlus, FileText, Calendar, TrendingUp } from 'lucide-react';

const App = () => {
  return (
    <div className="app-container">
      {/* Header / Navigation Bar */}
      <header className="header">
        <div className="header-title">
          Driver's Portal
        </div>
        <div className="header-links">
          <a
            href="" // In a real app, this would link to your login page
            className="login-link"
          >
            <LogIn className="icon-margin-right" size={20} />
            Login
          </a>
          <a
            href="#" // In a real app, this would link to your sign up page
            className="signup-link"
          >
            <UserPlus className="icon-margin-right" size={20} />
            Sign Up
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero-section">
        <h1 className="hero-title">
          Manage Your Driver's License Online
        </h1>
        <p className="hero-subtitle">
          Your one-stop digital solution for all your driver's license needs. Renew, schedule, and track your records with ease from anywhere.
        </p>
        <a
          href="#" // This would link to the sign-up page
          className="get-started-btn"
        >
          Get Started
        </a>
      </main>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="features-heading">
            Key Features
          </h2>
          <div className="features-grid">
            {/* Feature Card 1: Renewals */}
            <div className="feature-card">
              <div className="feature-icon-container renewals-icon-bg">
                <FileText size={36} />
              </div>
              <h3>Easy Renewals</h3>
              <p>
                Renew your license in minutes with our streamlined online process.
              </p>
            </div>
            
            {/* Feature Card 2: Scheduling */}
            <div className="feature-card">
              <div className="feature-icon-container scheduling-icon-bg">
                <Calendar size={36} />
              </div>
              <h3>Schedule Your Test</h3>
              <p>
                Book your written or driving test at a convenient time and location.
              </p>
            </div>

            {/* Feature Card 3: Records */}
            <div className="feature-card">
              <div className="feature-icon-container records-icon-bg">
                <TrendingUp size={36} />
              </div>
              <h3>Track Your Records</h3>
              <p>
                Access your driving history, points, and digital license from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        &copy; {new Date().getFullYear()} Driver's Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default App;

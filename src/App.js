import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landing/LandingPage";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Dashboard from "./components/Dashboard";
// You can add pages for Career, About, Contact, Blog or use placeholders.

function Career() { return <div className="p-6 text-center">Career Page (Placeholder)</div> }
function About() { return <div className="p-6 text-center">About Us Page (Placeholder)</div> }
function Contact() { return <div className="p-6 text-center">Contact Us Page (Placeholder)</div> }
function Blog() { return <div className="p-6 text-center">Blog Page (Placeholder)</div> }

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/career" element={<Career />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;

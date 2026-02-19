import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link } from 'react-router-dom';
import { useUsers } from '../../context/UserContext';

const GOOGLE_CLIENT_ID = '709059851452-216naeres4arbstj7lt41tcbe5s5idqe.apps.googleusercontent.com';
const RECAPTCHA_SITE_KEY = '6LcQ2YgrAAAAAADQFgTecpzkQce7j4eVD_KniXmy';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [error, setError] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);

  const { addUser, userExists, addGoogleUser } = useUsers();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!recaptchaValue) {
      setError('Please complete the reCAPTCHA.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setSignupLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const existingUser = userExists(email);

      if (existingUser) {
        setError('An account with this email already exists. Please sign in instead.');
        return;
      }

      const newUser = { email, password, name, authType: 'email' };
      addUser(newUser);

      alert(`Account created successfully for ${name}!\n\nYou can now sign in with your email and password.`);

      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      setError('Failed to create account. Please try again.');
    } finally {
      setSignupLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const googleUserInfo = {
        email: 'googleuser@gmail.com',
        name: 'Google User',
        googleId: 'google_user_id_123',
        authType: 'google'
      };

      const existingGoogleUser = userExists(googleUserInfo.email);

      if (existingGoogleUser) {
        alert('An account with this Google email already exists. Please sign in instead.');
        return;
      }

      addGoogleUser(googleUserInfo);

      alert(`Google account created successfully for ${googleUserInfo.name}!\n\nYou can now sign in with Google.`);
    } catch (error) {
      setError('Google sign-up failed. Please try again.');
    }
  };

  const handleGoogleError = () => {
    setError('Google sign-up failed.');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-white">
      <div className="w-full max-w-md p-10 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center bg-white animate-fade-in">
        {/* Animated SVG/Gradient Design */}
        <div className="w-full flex justify-center mb-8">
          <svg width="100" height="60" viewBox="0 0 100 60" fill="none" className="animate-pulse">
            <ellipse cx="50" cy="30" rx="48" ry="18" fill="#6366F1" fillOpacity="0.15" />
            <ellipse cx="50" cy="30" rx="30" ry="10" fill="#6366F1" fillOpacity="0.25" />
            <ellipse cx="50" cy="30" rx="12" ry="4" fill="#6366F1" fillOpacity="0.4" />
          </svg>
        </div>
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/bluestock_logo.png"
            alt="BLUESTOCK Logo"
            className="mb-4 w-40 h-auto"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Create an account</h1>
        <form onSubmit={handleSignUp} className="w-full">
          <div className="mb-5">
            <label className="block text-gray-800 font-medium mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-400"
              placeholder="Shrutika Shinde"
              value={name}
              onChange={e => setName(e.target.value)}
              autoComplete="name"
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-800 font-medium mb-1" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-400"
              placeholder="hello@bluestock.in"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-800 font-medium mb-1" htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-400 pr-10"
                placeholder="••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="mb-5">
            <p className="text-gray-600 text-sm">
              By continuing, you agree to our{' '}
              <Link to="/terms" className="text-indigo-600 hover:underline font-medium">Terms of Service</Link>.
            </p>
          </div>
          <div className="mb-5">
            <div className="border border-gray-300 rounded-lg p-4 flex justify-center">
              <ReCAPTCHA
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={setRecaptchaValue}
                theme="light"
                size="normal"
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm mb-3 font-medium">{error}</div>}
          <button
            type="submit"
            disabled={signupLoading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-lg transition-colors mb-6 shadow-sm text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {signupLoading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>
        {/* Separator */}
        <div className="flex items-center w-full mb-6">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="mx-3 text-gray-400 text-sm bg-white px-2 -mt-1">or sign up with</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>
        {/* Google Sign Up */}
        <div className="w-full mb-6">
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              width="100%"
              shape="rect"
              text="continue_with"
              useOneTap
              theme="outline"
              size="large"
              logo_alignment="left"
            />
          </GoogleOAuthProvider>
        </div>
        {/* Sign In Link */}
        <div className="w-full text-center">
          <span className="text-gray-600 text-sm">Already have an account? </span>
          <Link to="/signin" className="text-indigo-600 hover:underline font-semibold text-sm">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
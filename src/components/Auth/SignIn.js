import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link, useNavigate } from 'react-router-dom';
import { useUsers } from '../../context/UserContext';

const GOOGLE_CLIENT_ID = '709059851452-216naeres4arbstj7lt41tcbe5s5idqe.apps.googleusercontent.com';
const RECAPTCHA_SITE_KEY = '6LcQ2YgrAAAAAADQFgTecpzkQce7j4eVD_KniXmy';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [error, setError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const { validateLogin, validateGoogleUser } = useUsers();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }

    if (!recaptchaValue) {
      setError('Please complete the reCAPTCHA.');
      return;
    }

    setLoginLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const result = validateLogin(email, password);

      if (!result.success) {
        setError(result.error);
        return;
      }

      alert(`Welcome back, ${result.user.name}!`);
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate('/forgot-password'); // <-- fixed path
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const googleEmail = 'googleuser@gmail.com';
      const result = validateGoogleUser(googleEmail);

      if (!result.success) {
        alert(result.error);
        return;
      }

      alert(`Welcome back, ${result.user.name}!`);
    } catch (error) {
      setError('Google sign-in failed. Please try again.');
    }
  };

  const handleGoogleError = () => {
    setError('Google sign-in failed.');
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
        <form onSubmit={handleLogin} className="w-full">
          <div className="mb-5">
            <label className="block text-gray-800 font-medium mb-1" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-400"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="mb-5 relative">
            <label className="block text-gray-800 font-medium mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-400"
              placeholder="••••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={handleForgotPassword}
              className="absolute right-0 top-0 text-xs text-indigo-500 hover:underline font-medium mt-1"
            >
              Forgot Password?
            </button>
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
          <div className="flex items-center mb-5">
            <input
              id="keepSignedIn"
              type="checkbox"
              checked={keepSignedIn}
              onChange={e => setKeepSignedIn(e.target.checked)}
              className="mr-2 accent-indigo-600 w-4 h-4 rounded"
            />
            <label htmlFor="keepSignedIn" className="text-gray-800 text-sm font-medium select-none">Keep me signed in</label>
          </div>
          {error && <div className="text-red-500 text-sm mb-3 font-medium">{error}</div>}
          <button
            type="submit"
            disabled={loginLoading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-lg transition-colors mb-6 shadow-sm text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loginLoading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        {/* Separator */}
        <div className="flex items-center w-full mb-6">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="mx-3 text-gray-400 text-sm bg-white px-2 -mt-1">or sign in with</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>
        {/* Google Login */}
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
        {/* Create Account Link */}
        <div className="w-full text-center">
          <Link to="/signup" className="text-indigo-600 hover:underline font-semibold text-sm">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
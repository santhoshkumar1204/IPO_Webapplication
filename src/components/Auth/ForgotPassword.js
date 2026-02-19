import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../../context/UserContext';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { userExists, resetPassword } = useUsers();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    const user = userExists(email);
    if (!user) {
      setError('No account found with this email.');
      return;
    }
    if (user.authType === 'google') {
      setError('Password reset is not available for Google accounts.');
      return;
    }
    setStep(2);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    resetPassword(email, newPassword);
    setSuccess('Password reset successful! You can now sign in.');
    setTimeout(() => window.location.href = '/signin', 1500);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-white">
      <div className="w-full max-w-md p-10 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center bg-white animate-fade-in">
        <div className="w-full flex justify-center mb-8">
          <svg width="100" height="60" viewBox="0 0 100 60" fill="none" className="animate-pulse">
            <ellipse cx="50" cy="30" rx="48" ry="18" fill="#6366F1" fillOpacity="0.15" />
            <ellipse cx="50" cy="30" rx="30" ry="10" fill="#6366F1" fillOpacity="0.25" />
            <ellipse cx="50" cy="30" rx="12" ry="4" fill="#6366F1" fillOpacity="0.4" />
          </svg>
        </div>
        <div className="flex flex-col items-center mb-8">
          <img
            src="/bluestock_logo.png"
            alt="BLUESTOCK Logo"
            className="mb-4 w-40 h-auto"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Forgot Password</h1>
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="w-full">
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
            {error && <div className="text-red-500 text-sm mb-3 font-medium">{error}</div>}
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-lg transition-colors mb-6 shadow-sm text-base"
            >
              Next
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handlePasswordReset} className="w-full">
            <div className="mb-5">
              <label className="block text-gray-800 font-medium mb-1" htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-400"
                placeholder="Enter new password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <div className="mb-5">
              <label className="block text-gray-800 font-medium mb-1" htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-400"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            {error && <div className="text-red-500 text-sm mb-3 font-medium">{error}</div>}
            {success && <div className="text-green-600 text-sm mb-3 font-medium">{success}</div>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-lg transition-colors mb-6 shadow-sm text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
        <div className="w-full text-center">
          <Link to="/signin" className="text-indigo-600 hover:underline font-semibold text-sm">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
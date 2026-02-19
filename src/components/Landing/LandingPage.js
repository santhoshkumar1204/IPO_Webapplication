import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IPOGrid from "./IPOGrid";
import FAQSection from "./FAQSection";

const navLinks = [
  { label: "IPO", href: "#ipo" },
  { label: "Community", href: "#community" },
  { label: "Products", href: "#products" },
  { label: "Brokers", href: "#brokers" },
  { label: "Live News", href: "#news", badge: "NEW" },
];

function AnimatedScrollBlock({ children, position }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`w-full flex ${position === "left" ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`transition-all duration-1000 ease-out transform ${visible ? "opacity-100 translate-x-0" : position === "left" ? "opacity-0 -translate-x-16" : "opacity-0 translate-x-16"}`}
      >
        {children}
      </div>
    </div>
  );
}

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/bluestock_logo.png" alt="BLUESTOCK Logo" className="h-10 w-auto" />
            <span className="font-bold text-xl text-gray-800">BLUESTOCK</span>
            <nav className="ml-8 hidden md:flex space-x-6">
              {navLinks.map(link => (
                <a key={link.label} href={link.href} className="text-gray-700 hover:text-indigo-600 font-medium relative group transition-colors">
                  {link.label}
                  {link.badge && <span className="ml-1 px-2 py-0.5 text-xs bg-indigo-100 text-indigo-600 rounded">{link.badge}</span>}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <button
              className="text-gray-700 hover:text-indigo-600 font-semibold px-4 py-2 rounded-lg transition-colors"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition-transform transform hover:scale-105"
              onClick={() => navigate("/signup")}
            >
              Sign Up Now
            </button>
            <button className="ml-2 p-2 rounded hover:bg-gray-100">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><circle cx="12" cy="12" r="10"/><path d="M16 12a4 4 0 01-8 0"/></svg>
            </button>
          </div>
        </div>
      </header>
      {/* Hero Section (Blue) */}
      <section className="bg-gradient-to-br from-indigo-400 via-indigo-100 to-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-indigo-800 mb-2 animate-fade-in">Bluestock | Trading with Insights</h1>
            <p className="text-lg text-gray-700 mb-4 animate-fade-in delay-100">#Stock Market SuperHero</p>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 animate-fade-in delay-200"
              onClick={() => navigate("/dashboard")}
            >
              Get Started
            </button>
          </div>
          {/* Fintech/Trading Animated SVG on the right */}
          <div className="flex-1 flex justify-center items-center animate-slide-in-right">
            <div className="w-full max-w-md h-72 flex items-center justify-center">
              {/* Online Trading Animation Start */}
              <svg viewBox="0 0 350 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                  <linearGradient id="laptopGradient" x1="0" y1="0" x2="350" y2="240" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#6366F1" stopOpacity="0.18" />
                    <stop offset="1" stopColor="#818CF8" stopOpacity="0.10" />
                  </linearGradient>
                  <linearGradient id="chartLineGradient" x1="0" y1="0" x2="0" y2="60" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#34D399" />
                    <stop offset="1" stopColor="#6366F1" />
                  </linearGradient>
                </defs>
                {/* Background ellipse */}
                <ellipse cx="175" cy="120" rx="160" ry="90" fill="url(#laptopGradient)" />
                {/* Laptop base */}
                <rect x="90" y="140" width="170" height="40" rx="8" fill="#E5E7EB" stroke="#6366F1" strokeWidth="2" />
                {/* Laptop screen */}
                <rect x="110" y="80" width="130" height="70" rx="6" fill="#fff" stroke="#6366F1" strokeWidth="2" />
                {/* Chart bars on screen */}
                <rect x="125" y="130" width="10" height="15" rx="2" fill="#6366F1" className="animate-pulse" />
                <rect x="140" y="120" width="10" height="25" rx="2" fill="#34D399" className="animate-pulse" />
                <rect x="155" y="110" width="10" height="35" rx="2" fill="#6366F1" className="animate-pulse" />
                <rect x="170" y="125" width="10" height="20" rx="2" fill="#34D399" className="animate-pulse" />
                <rect x="185" y="115" width="10" height="30" rx="2" fill="#6366F1" className="animate-pulse" />
                <rect x="200" y="105" width="10" height="40" rx="2" fill="#34D399" className="animate-pulse" />
                {/* Animated chart line */}
                <polyline points="120,140 135,125 150,135 165,110 180,120 195,105 210,115 225,100" fill="none" stroke="url(#chartLineGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce" />
                {/* Buy/Sell buttons */}
                <rect x="125" y="150" width="40" height="14" rx="4" fill="#34D399" className="animate-fade-in" />
                <rect x="185" y="150" width="40" height="14" rx="4" fill="#F87171" className="animate-fade-in" />
                <text x="145" y="161" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">BUY</text>
                <text x="205" y="161" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">SELL</text>
                {/* Coins for trading effect */}
                <circle cx="260" cy="180" r="16" fill="#FBBF24" fillOpacity="0.85" className="animate-pulse" />
                <circle cx="245" cy="195" r="8" fill="#FBBF24" fillOpacity="0.65" className="animate-pulse" />
                <circle cx="275" cy="195" r="6" fill="#FBBF24" fillOpacity="0.5" className="animate-pulse" />
                {/* Coin highlights */}
                <ellipse cx="260" cy="176" rx="5" ry="2" fill="#fff" fillOpacity="0.7" />
                {/* Mouse cursor for trading */}
                <polygon points="230,120 238,140 234,138 232,145 228,143 230,136 226,134" fill="#6366F1" className="animate-bounce" />
              </svg>
              {/* Online Trading Animation End */}
            </div>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Upcoming IPO</h2>
        <IPOGrid />
        {/* Animated Text Sections Start */}
        <AnimatedScrollBlock position="left">
          <div className="mb-12">
            <div className="text-gray-400 font-semibold text-lg mb-4">Built for a growing India.</div>
            <div className="space-y-2">
              <div className="text-4xl font-extrabold text-purple-600">It’s easy</div>
              <div className="text-4xl font-extrabold text-black">It’s powerful</div>
              <div className="text-4xl font-extrabold text-purple-600">It’s beautiful</div>
            </div>
          </div>
        </AnimatedScrollBlock>
        <AnimatedScrollBlock position="right">
          <div className="mb-12 flex flex-col items-end">
            <div className="text-5xl mb-2">👍</div>
            <div className="text-right">
              <span className="font-bold">Beautiful UI</span> for the modern trader,<br />
              with access on all platforms,<br />
              to trade <span className="font-bold">on the go</span>
            </div>
          </div>
        </AnimatedScrollBlock>
        {/* Animated Text Sections End */}
        {/* Bluestock Highlights Section Start */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <AnimatedScrollBlock position="left">
            <div className="mb-8 md:mb-0">
              <div className="text-gray-400 font-semibold text-lg mb-4">Bluestock Highlights</div>
              <div className="space-y-2">
                <div className="text-4xl font-extrabold text-purple-600">Zero Brokerage</div>
                <div className="text-4xl font-extrabold text-black">Powerful Scanner</div>
                <div className="text-4xl font-extrabold text-purple-600">Real-time Alerts</div>
                <div className="text-4xl font-extrabold text-black">Seamless Experience</div>
              </div>
            </div>
          </AnimatedScrollBlock>
          <AnimatedScrollBlock position="right">
            <div className="flex justify-end w-full">
              <img
                src="/scanner.png"
                alt="Bluestock Scanner"
                className="w-72 h-auto rounded-xl shadow-lg transition-all duration-1000 ease-out transform"
                style={{ boxShadow: '0 8px 32px 0 rgba(99,102,241,0.25)' }}
              />
            </div>
          </AnimatedScrollBlock>
        </div>
        {/* Bluestock Highlights Section End */}
        <div className="mt-12">
          <FAQSection />
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-white border-t pt-10 pb-6 px-4 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 text-sm text-gray-700 mb-8">
          <div>
            <h4 className="font-bold mb-2">Resources</h4>
            <ul className="space-y-1">
              <li>Trading View</li>
              <li>NSE Holidays</li>
              <li>e-Voting CDSL</li>
              <li>e-Voting NSDL</li>
              <li>Market Timings</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Company</h4>
            <ul className="space-y-1">
              <li>Careers</li>
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Community</li>
              <li>Blogs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Offerings</h4>
            <ul className="space-y-1">
              <li>Compare Broker</li>
              <li>Fin Calculators</li>
              <li>IPO</li>
              <li>All Brokers</li>
              <li>Products</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Links</h4>
            <ul className="space-y-1">
              <li>Shark Investor</li>
              <li>Mutual Funds</li>
              <li>Sitemap</li>
              <li>Indian Indices</li>
              <li>Bug Bounty Program</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Policy</h4>
            <ul className="space-y-1">
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Refund Policy</li>
              <li>Disclaimer</li>
              <li>Trust & Security</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 border-t pt-4">
          <div className="flex items-center space-x-3 mb-2 md:mb-0">
            <img src="/bluestock_logo.png" alt="BLUESTOCK Logo" className="h-8 w-auto" />
            <span>Bluestock Fintech, Pune, Maharashtra</span>
            <span>#startupindia</span>
          </div>
          <div className="text-center md:text-right">
            <span>Bluestock Fintech All Rights Reserved.</span>
            <span className="ml-4">Made with <span className="text-red-500">♥</span> in Pune, Maharashtra</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IPOGrid from "../IPOGrid";
import FAQSection from "../FAQSection";

// Home Dropdown Button Component
function HomeDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    function onClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const items = [
    { label: "Career", path: "/career" },
    { label: "About us", path: "/about" },
    { label: "Contact us", path: "/contact" },
    { label: "Blog", path: "/blog" }
  ];

  return (
    <div ref={ref} className="relative inline-block text-left z-50">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center border border-gray-300 rounded-md shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        Home
        <svg
          className="ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div
          className="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
        >
          <div className="py-1">
            {items.map(({ label, path }) => (
              <button
                key={label}
                onClick={() => { setOpen(false); navigate(path); }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                role="menuitem"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Ticker Tape Animation
function TickerTape() {
  const stocks = [
    { symbol: "NIFTY", value: "22,525.65", change: "+0.54%" },
    { symbol: "BANKNIFTY", value: "49,320.45", change: "+1.05%" },
    { symbol: "AAPL", value: "$214.82", change: "+1.4%" },
    { symbol: "MSFT", value: "$387.60", change: "-0.5%" },
    { symbol: "SENSEX", value: "72,410.23", change: "+0.62%" },
    { symbol: "TSLA", value: "$255.10", change: "+2.9%" },
    { symbol: "BTC", value: "$66,820", change: "+0.8%" },
    { symbol: "ETH", value: "$3,550", change: "-0.4%" }
  ];
  return (
    <>
      <style>
        {`
        .ticker-tape-container {
          width: 100%;
          background: #fffbe7;
          border-top: 1.3px solid #eeecc2;
          border-bottom: 1.3px solid #eeecc2;
          overflow: hidden;
          height: 54px;
          display: flex;
          align-items: center;
          margin: 28px 0 32px 0;
          position: relative;
        }
        .ticker-tape-animate {
          display: flex;
          animation: marquee-left 17s linear infinite;
        }
        .ticker-tape-stock {
          display: flex;
          align-items: center;
          margin: 0 36px;
          font-size: 1.15rem;
          font-weight: 600;
          white-space: nowrap;
        }
        .ticker-symbol {
          color: #bc7600;
          margin-right: 7px;
          letter-spacing: .5px;
        }
        .ticker-value {
          color: #222;
          margin-right: 8px;
        }
        .ticker-change.positive {
          color: #37b66a;
          padding: 2px 9px;
          background: #e8fed7;
          border-radius: 7px;
          font-size: 0.97rem;
          margin-right: 16px;
        }
        .ticker-change.negative {
          color: #f04b5b;
          background: #ffeaea;
          padding: 2px 9px;
          border-radius: 7px;
          font-size: 0.97rem;
          margin-right: 16px;
        }
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        `}
      </style>
      <div className="ticker-tape-container" aria-label="Live Market Ticker">
        <div className="ticker-tape-animate" style={{ width: "max-content" }}>
          {[...stocks, ...stocks].map((stock, idx) => (
            <div className="ticker-tape-stock" key={idx}>
              <span className="ticker-symbol">{stock.symbol}</span>
              <span className="ticker-value">{stock.value}</span>
              <span
                className={
                  "ticker-change " + (stock.change.startsWith("+") ? "positive" : "negative")
                }
              >
                {stock.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Animated Order Flow Bubbles
function AnimatedOrderFlow() {
  const orders = [
    { id: 1, type: "buy", label: "Buy 100 @ ₹450" },
    { id: 2, type: "sell", label: "Sell 50 @ ₹452" },
    { id: 3, type: "buy", label: "Buy 75 @ ₹451.5" },
    { id: 4, type: "sell", label: "Sell 60 @ ₹453" },
    { id: 5, type: "buy", label: "Buy 200 @ ₹449.8" },
    { id: 6, type: "sell", label: "Sell 30 @ ₹454" }
  ];

  return (
    <>
      <style>
        {`
        .orderflow-container {
          position: relative;
          width: 100%;
          min-height: 100px;
          margin: 38px 0 24px 0;
          overflow: hidden;
          background: white;
        }
        .order-bubble {
          position: absolute;
          left: -180px;
          top: 16px;
          min-width: 135px;
          padding: 10px 20px;
          margin-bottom: 18px;
          border-radius: 25px;
          font-size: 1.08rem;
          font-weight: 500;
          box-shadow: 0 1.5px 12px rgba(100,100,150,0.08);
          opacity: 0.97;
          white-space: nowrap;
          animation: flow-x 8.5s linear infinite;
        }
        .order-bubble.buy {
          background: #e3ffe7;
          color: #16753f;
          border: 1.25px solid #47d58c;
        }
        .order-bubble.sell {
          background: #ffe7e8;
          color: #b22234;
          border: 1.25px solid #fa4c5a;
        }
        .order-bubble:nth-child(even) {
          top: 52px;
        }
        @keyframes flow-x {
          0% {
            left: -180px;
            opacity: 0.65;
          }
          12% {
            opacity: 1;
          }
          92% {
            opacity: 1;
          }
          100% {
            left: 100vw;
            opacity: 0.13;
          }
        }
        `}
      </style>
      <div className="orderflow-container" aria-label="Live Trade Orders">
        {orders.map((order, idx) => (
          <div
            key={order.id}
            className={`order-bubble ${order.type}`}
            style={{ animationDelay: `${idx * 1.1}s` }}
          >
            {order.label}
          </div>
        ))}
      </div>
    </>
  );
}

// Animated "Learn Chart | Analytics | Club" (Scroll Pop-In)
function AnimatedLearningSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-stretch gap-8 py-10 transition-all duration-800 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      aria-label="Learning features"
    >
      {/* Card 1 */}
      <div className="flex-1 rounded-xl bg-blue-50 px-7 py-6 shadow-lg">
        <h3 className="text-xl font-bold text-blue-700 mb-2 flex items-center gap-2">
          Learn Chart <span>📈</span>
        </h3>
        <ul className="mt-2 space-y-3 font-medium">
          <li className="flex items-start">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500 text-white mr-3 font-semibold">
              1
            </span>
            <span>Technical, Fundamental</span>
          </li>
          <li className="flex items-start">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500 text-white mr-3 font-semibold">
              2
            </span>
            <span>Finology, Facts, Equity</span>
          </li>
          <li className="flex items-start">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500 text-white mr-3 font-semibold">
              3
            </span>
            <span>Trading Psychology</span>
          </li>
          <li className="flex items-start">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500 text-white mr-3 font-semibold">
              4
            </span>
            <span>Risk Assessment</span>
          </li>
          <li className="flex items-start">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500 text-white mr-3 font-semibold">
              5
            </span>
            <span>Option Trading</span>
          </li>
        </ul>
      </div>
      {/* Card 2 */}
      <div className="flex-1 rounded-xl bg-pink-50 px-7 py-6 shadow-lg">
        <h3 className="text-xl font-bold text-pink-700 mb-2 flex items-center gap-2">
          Analytics <span>📊</span>
        </h3>
        <ul className="mt-2 space-y-3 font-medium">
          <li className="flex items-start">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500 text-white mr-3 font-semibold">
              1
            </span>
            <span>Live Sector Trend</span>
          </li>
          <li className="flex items-start">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500 text-white mr-3 font-semibold">
              2
            </span>
            <span>IPO DRHP</span>
          </li>
          <li className="flex items-start">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500 text-white mr-3 font-semibold">
              3
            </span>
            <span>Sectoral Distribution</span>
          </li>
          <li className="flex items-start">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500 text-white mr-3 font-semibold">
              4
            </span>
            <span>Stock Overview</span>
          </li>
          <li className="flex items-start">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500 text-white mr-3 font-semibold">
              5
            </span>
            <span>TradingView Chart</span>
          </li>
          <li className="flex items-start">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500 text-white mr-3 font-semibold">
              6
            </span>
            <span>Technical, Fundamental</span>
          </li>
        </ul>
      </div>
      {/* Card 3 */}
      <div className="flex-1 rounded-xl bg-yellow-50 px-7 py-6 shadow-lg">
        <h3 className="text-xl font-bold text-yellow-700 mb-2 flex items-center gap-2">
          Club <span>⚡</span>
        </h3>
        <ul className="mt-2 space-y-3 font-medium">
          <li className="flex items-start">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500 text-white mr-3 font-semibold">
              1
            </span>
            <span>Educational Resources</span>
          </li>
          <li className="flex items-start">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500 text-white mr-3 font-semibold">
              2
            </span>
            <span>Real-time Chat</span>
          </li>
          <li className="flex items-start">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500 text-white mr-3 font-semibold">
              3
            </span>
            <span>Forums</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

// Social Media Contact Icons (functional)
function SocialMediaContact() {
  return (
    <div className="max-w-5xl mx-auto mt-14 mb-8 px-4 py-3 bg-gray-50 rounded-lg flex justify-center gap-8 shadow-md">
      <a
        href="https://www.instagram.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="text-pink-600 hover:text-pink-700 transition-colors"
        title="Instagram"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zm7.25 2a.75.75 0 110 1.5.75.75 0 010-1.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" />
        </svg>
      </a>
      <a
        href="https://www.facebook.com/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="text-blue-600 hover:text-blue-700 transition-colors"
        title="Facebook"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.89h2.54v-2.205c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.465h-1.26c-1.243 0-1.63.771-1.63 1.562v1.873h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
        </svg>
      </a>
      <a
        href="https://www.linkedin.com/in/yourprofile"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="text-blue-700 hover:text-blue-800 transition-colors"
        title="LinkedIn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.452 20.452h-3.554v-5.569c0-1.328-.025-3.04-1.852-3.04-1.853 0-2.136 1.446-2.136 2.939v5.67H9.355V9h3.414v1.561h.049c.476-.9 1.635-1.85 3.364-1.85 3.598 0 4.263 2.367 4.263 5.455v6.286zM5.337 7.433a2.068 2.068 0 11.001-4.135 2.068 2.068 0 010 4.135zm1.777 13.019H3.561V9h3.553v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.726v20.549C0 23.24.792 24 1.771 24h20.451C23.208 24 24 23.24 24 22.275V1.726C24 .774 23.208 0 22.225 0z" />
        </svg>
      </a>
    </div>
  );
}

// MAIN PAGE EXPORT
export default function LandingPage() {
  return (
    <div>
      {/* Top navigation bar with Home button dropdown */}
      <nav className="w-full bg-white shadow sticky top-0 z-50 px-4 py-2 flex justify-start max-w-7xl mx-auto">
        <HomeDropdown />
      </nav>
      <TickerTape />
      {/* Section: headings + highlights + scan image + bubbles */}
      <div className="flex flex-row items-center justify-between gap-8 pt-10 pb-7 bg-white max-w-6xl mx-auto">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            It's easy. It's powerful. It's beautiful.
          </h1>
          <div className="text-base text-blue-900 font-semibold mb-4">
            Bluestock Highlights
          </div>
        </div>
        <div className="flex-shrink-0 flex flex-col items-center">
          <AnimatedOrderFlow />
          <span className="mt-2 text-xs text-gray-400">Live Trade Orders</span>
        </div>
        <div className="flex-1 flex justify-end">
          <img
            src="/scan-image.png"
            alt="Scan"
            className="h-40 w-40 object-contain"
          />
        </div>
      </div>
      <AnimatedLearningSection />
      <SocialMediaContact />
      <section className="max-w-6xl mx-auto px-4">
        <h1 id="ipo" className="text-2xl font-bold mb-4">
          Upcoming IPO
        </h1>
        <IPOGrid />
      </section>
      <FAQSection />
    </div>
  );
}



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// List of all available ppl images (no repeats)
const frameImages = [
  "/ppl_2.webp", "/ppl_3.jpg", "/ppl_4.webp", "/ppl_5.jpg", "/ppl_6.jpg", "/ppl_7.jpg",
  "/ppl8.webp", "/ppl9.webp", "/ppl10.webp", "/ppl11.jpg", "/ppl12.webp", "/ppl13.jpg",
  "/ppl14.png", "/ppl15.png", "/ppl16.webp", "/ppl17.webp", "/ppl18.webp", "/ppl19.webp",
  "/ppl20.jpg", "/ppl21.webp", "/ppl22.webp", "/ppl23.jpg", "/ppl24.webp", "/ppl25.jpg"
];

// Assign images in order, no repeats, but fix the three problematic frames:
const technicalFrames = [
  { key: "triple-bottom", title: "Triple Bottom", color: "bg-blue-200", icon: "📉", img: frameImages[0], content: "A bullish reversal pattern used to predict the bottoming of a stock that has been in a downtrend." },
  { key: "cup-handle", title: "Cup & Handle Pattern", color: "bg-blue-100", icon: "☕", img: frameImages[1], content: "A bullish continuation pattern that makes a consolidation period followed by a breakout." },
  { key: "bullish-bat", title: "Bullish Bat Pattern", color: "bg-blue-300", icon: "🦇", img: frameImages[2], content: "Shows the typical market behavior of trend consolidation and re-trend." },
  {
    key: "ascending-triangle",
    title: "Ascending Triangle",
    color: "bg-blue-200",
    icon: "🔺",
    img: "/ppl14.png", // <-- fixed: use an available, unused image
    content: "A bullish continuation pattern with a horizontal resistance and upward sloping support."
  },
  {
    key: "bullish-flag",
    title: "Bullish Flag Pattern",
    color: "bg-blue-100",
    icon: "🚩",
    img: "/ppl15.png", // <-- fixed: use an available, unused image
    content: "A continuation pattern that signals the continuation of an uptrend after a brief consolidation."
  },
  {
    key: "indian-startup",
    title: "Indian Startup",
    color: "bg-green-100",
    icon: "🚀",
    img: "/ppl16.webp", // <-- fixed: use an available, unused image
    content: [
      { title: "Exploring Fundamental Health of Indian Startups", text: "Headed for IPO" },
      { title: "Zomato", text: "Zomato welcomed by investors. Now, let’s study the financial health of the other startups on their way to listing." },
      { title: "Policy Bazaar", text: "Processes nearly 25% of India’s life insurance and over 7% of the country’s retail health cover." },
      { title: "Nykaa", text: "3 lakh products across 1,500 brands. Valuation: $1.8 Bn." },
      { title: "Paytm", text: "Biggest IPO in Indian history. Valuation: $16 Bn." }
    ]
  },
  { key: "equity-research", title: "Equity Research", color: "bg-yellow-100", icon: "📑", img: frameImages[6], content: [
    { title: "Basics of Equity Research", text: "Swipe left for more" },
    { title: "What is Equity Research?", text: "Process of analysing stocks from different perspectives to decide whether to buy, sell or hold." },
    { title: "Economy and Industry Analysis", text: "Performance of stocks varies across economic cycles and industry phases." }
  ]},
  { key: "ebita-pe", title: "EBITA & P/E", color: "bg-yellow-200", icon: "💹", img: frameImages[7], content: "Use both the EV/EBITDA and the price-to-earnings (P/E) ratios as metrics to analyze a company’s potential." },
  { key: "financial-ratio", title: "Financial Ratio", color: "bg-purple-100", icon: "📊", img: frameImages[8], content: "Profitability, Valuation, Liquidity, Solvency, and Activity ratios." },
  { key: "financial-statement", title: "Financial Statement", color: "bg-purple-200", icon: "📋", img: frameImages[9], content: "Balance Sheet, Profit & Loss Statement, Cash Flow Statement, Statement of Changes in Equity." },
  { key: "asset-classes", title: "Asset Classes", color: "bg-green-200", icon: "💼", img: frameImages[10], content: "Equity, Fixed Income, Commodities, Real Estate, Cash & Cash Equivalents." },
  // Add more frames if you want, using frameImages[11], frameImages[12], etc.
];

const fundamentalFrames = [
  technicalFrames.find(f => f.key === "indian-startup"),
  technicalFrames.find(f => f.key === "equity-research"),
  technicalFrames.find(f => f.key === "financial-statement"),
  technicalFrames.find(f => f.key === "asset-classes"),
].filter(Boolean);

const Dashboard = () => {
  const [section, setSection] = useState(null);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate();

  const frames = section === "technical" ? technicalFrames : fundamentalFrames;

  const handleFrameClick = (frame) => {
    setSelectedFrame(frame);
    setSlideIndex(0);
  };

  const handleBack = () => {
    // In frame overlay, Back should return to frames grid for current section
    setSelectedFrame(null);
    setSlideIndex(0);
  };

  const handleNext = () => {
    if (selectedFrame && Array.isArray(selectedFrame.content) && slideIndex < selectedFrame.content.length - 1) {
      setSlideIndex(slideIndex + 1);
    }
  };

  const handleDone = () => {
    setSelectedFrame(null);
    setSlideIndex(0);
  };

  const renderFrameContent = () => {
    if (!selectedFrame) return null;
    if (Array.isArray(selectedFrame.content)) {
      const page = selectedFrame.content[slideIndex];
      return (
        <div className={`p-8 rounded-xl shadow-xl w-full max-w-2xl bg-white`}>
          <img
            src={selectedFrame.img}
            alt={page.title}
            className="w-32 h-32 object-contain rounded-xl shadow mb-4 mx-auto"
          />
          <h2 className="text-2xl font-bold mb-2 text-indigo-700">{page.title}</h2>
          <p className="mb-2 text-gray-700">{page.text}</p>
          <div className="flex justify-between mt-8">
            <button
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              onClick={handleBack}
            >
              {slideIndex === 0 ? "Back" : "Previous"}
            </button>
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
              onClick={slideIndex === selectedFrame.content.length - 1 ? handleDone : handleNext}
            >
              {slideIndex === selectedFrame.content.length - 1 ? "Done" : "Next"}
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className={`p-8 rounded-xl shadow-xl w-full max-w-2xl bg-white`}>
        <img
          src={selectedFrame.img}
          alt={selectedFrame.title}
          className="w-32 h-32 object-contain rounded-xl shadow mb-4 mx-auto"
        />
        <h2 className="text-2xl font-bold mb-2 text-indigo-700">{selectedFrame.title}</h2>
        <p className="mb-2 text-gray-700">{selectedFrame.content}</p>
        <div className="flex justify-end mt-8">
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <img src="/ppl_banner.png" alt="Dashboard Banner" className="w-48 h-32 object-contain rounded-2xl shadow mb-6" />
      <h1 className="text-3xl font-extrabold text-indigo-700 mb-2">Welcome, know these terms and start trading!</h1>
      <p className="text-lg text-indigo-600 mb-8">Choose your preferred analysis to get started</p>
      {!section && (
        <div className="flex flex-col md:flex-row gap-12 mt-8">
          <div
            className="cursor-pointer bg-gradient-to-br from-blue-50 to-blue-200 rounded-2xl shadow-xl p-10 flex flex-col items-center transition hover:scale-105"
            onClick={() => setSection("technical")}
          >
            <img src="/ppl_2.webp" alt="Technical" className="w-24 h-24 mb-4 rounded-xl shadow" />
            <span className="text-2xl font-bold text-blue-800 mb-2">Technical</span>
            <span className="text-base text-blue-600">Chart Patterns, Trends, and More</span>
          </div>
          <div
            className="cursor-pointer bg-gradient-to-br from-purple-50 to-purple-200 rounded-2xl shadow-xl p-10 flex flex-col items-center transition hover:scale-105"
            onClick={() => setSection("fundamental")}
          >
            <img src="/ppl_3.jpg" alt="Fundamental" className="w-24 h-24 mb-4 rounded-xl shadow" />
            <span className="text-2xl font-bold text-purple-800 mb-2">Fundamental</span>
            <span className="text-base text-purple-600">Company Health, Ratios, and More</span>
          </div>
        </div>
      )}
      {section && !selectedFrame && (
        <>
          <button
            className="absolute top-8 left-8 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            onClick={() => setSection(null)}
          >
            Back
          </button>
          <h2 className="text-2xl font-bold mb-6">{section === "technical" ? "Technical Analysis" : "Fundamental Analysis"}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {frames.map((frame) => (
              <div
                key={frame.key}
                className={`cursor-pointer rounded-xl shadow-lg p-6 flex flex-col items-center transition ${frame.color} hover:scale-105`}
                onClick={() => handleFrameClick(frame)}
              >
                <img src={frame.img} alt={frame.title} className="w-16 h-16 mb-2 rounded-lg shadow" />
                <span className="text-4xl mb-2">{frame.icon}</span>
                <div className="text-lg font-bold mb-2">{frame.title}</div>
                <div className="text-xs opacity-80">{frame.banner}</div>
              </div>
            ))}
          </div>
        </>
      )}
      {selectedFrame && (
        <div className="w-full flex flex-col items-center">
          {renderFrameContent()}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
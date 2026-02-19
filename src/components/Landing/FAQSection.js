import React, { useState } from "react";

const faqs = [
  {
    question: "How to Subscribe to an IPO?",
    answer: (
      <ul className="list-disc pl-5">
        <li>Step 1: Login to your respective service provider.</li>
        <li>Step 2: Click on the IPO button.</li>
        <li>Step 3: Select the IPO you want to bid and enter the relevant details.</li>
        <li>Step 4: Your subscription will be completed once you make the payment or give permission.</li>
      </ul>
    ),
  },
  {
    question: "Should I buy an IPO first day?",
    answer: (
      <p>Buying on the first day can be risky as prices may be volatile. It's best to research the company and market sentiment before investing.</p>
    ),
  },
  {
    question: "How do you know if an IPO is good?",
    answer: (
      <p>Check the company's fundamentals, management, sector outlook, and IPO valuation. Read the RHP/DRHP and consult financial experts if needed.</p>
    ),
  },
  {
    question: "How to check IPO start date?",
    answer: (
      <p>IPO start dates are published on stock exchange websites, financial news portals, and the company's RHP/DRHP documents.</p>
    ),
  },
  {
    question: "What is issue size?",
    answer: (
      <p>Issue size is the total value of shares offered in the IPO, calculated as the number of shares multiplied by the price per share.</p>
    ),
  },
  {
    question: "How many shares in a lot?",
    answer: (
      <p>Lot size is the minimum number of shares you must apply for in an IPO. It varies for each IPO and is specified in the RHP/DRHP.</p>
    ),
  },
  {
    question: "How is the lot size calculated?",
    answer: (
      <p>Lot size is determined by the company and regulators to ensure retail participation. It is mentioned in the IPO documents.</p>
    ),
  },
  {
    question: "Who decides the IPO price band?",
    answer: (
      <p>The price band is decided by the company and its lead managers based on valuation, demand, and market conditions.</p>
    ),
  },
  {
    question: "What is IPO GMP?",
    answer: (
      <p>IPO GMP (Grey Market Premium) is the premium at which IPO shares are traded unofficially before listing. It indicates market sentiment but is not official.</p>
    ),
  },
  {
    question: "How many lots should I apply for IPO?",
    answer: (
      <p>Apply based on your investment goals and risk appetite. Oversubscription may lead to partial allotment.</p>
    ),
  },
];

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="bg-white rounded-xl shadow border p-6">
      <h2 className="text-xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border rounded-lg transition-shadow duration-300 hover:shadow-lg">
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-left focus:outline-none"
              onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
            >
              <span className="font-medium text-gray-800">{faq.question}</span>
              <span className="text-2xl text-gray-400 transition-transform duration-200">{openIdx === idx ? "-" : "+"}</span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ${openIdx === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              {openIdx === idx && faq.answer && (
                <div className="px-6 pb-4 text-gray-700 text-sm animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection; 
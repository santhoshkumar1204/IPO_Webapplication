import React from "react";
import { useNavigate } from "react-router-dom";

const terms = [
  {
    title: "1. Introduction",
    content: [
      "Welcome to Bluestock Fintech (\"we\", \"us\", \"our\"), an online platform offering IPO alerts, analytics, trading tools, and community insights. By accessing or using our website, mobile app, or related services (together, the \"Platform\"), you agree to be bound by these Terms & Conditions (\"Terms\"). If you do not agree, please do not use the Platform."
    ]
  },
  {
    title: "2. Eligibility",
    content: [
      "You must be at least 18 years old and legally competent to enter into these Terms. By registering, you warrant that you meet these requirements."
    ]
  },
  {
    title: "3. Account Registration",
    content: [
      "You are responsible for safeguarding your login credentials.",
      "Information provided must be accurate, current, and complete.",
      "You are fully responsible for any activities under your account."
    ]
  },
  {
    title: "4. Services Provided",
    content: [
      "We offer:",
      "- IPO information and application tracking",
      "- Market analytics and trading signals",
      "- Portfolio tracking and reporting tools",
      "- Community discussion boards",
      "Note: We do not guarantee IPO allotment, profits, or uninterrupted service."
    ]
  },
  {
    title: "5. User Obligations",
    content: [
      "By using our Platform, you agree to:",
      "- Abide by all applicable laws and regulations",
      "- Provide truthful personal and financial details",
      "- Handle tax and legal obligations related to your investments"
    ]
  },
  {
    title: "6. Risk Disclosure",
    content: [
      "Trading carries inherent risks. Past performance is not indicative of future results. You should consult qualified financial professionals before making investment decisions."
    ]
  },
  {
    title: "7. Data Privacy",
    content: [
      "Your data is protected under our Privacy Policy. While we use encryption and security measures, no system is entirely secure."
    ]
  },
  {
    title: "8. Third-Party Services",
    content: [
      "We may integrate third-party services (e.g., broker APIs, KYC providers). We are not liable for actions or policies of such third parties."
    ]
  },
  {
    title: "9. Intellectual Property",
    content: [
      "All content, designs, and trademarks on the Platform are owned by Bluestock Fintech and may not be reused without permission."
    ]
  },
  {
    title: "10. Limitation of Liability",
    content: [
      "We are not liable for any losses arising from technical issues, data inaccuracy, third-party platform failures, or unauthorized access."
    ]
  },
  {
    title: "11. Account Suspension or Termination",
    content: [
      "We reserve the right to suspend or terminate your usage for violating these Terms, engaging in fraudulent activity, or otherwise acting against our interests."
    ]
  },
  {
    title: "12. Amendments to Terms",
    content: [
      "We may update these Terms occasionally. Revised terms will be communicated via the Platform or email. Continued use after changes implies acceptance."
    ]
  },
  {
    title: "13. Governing Law",
    content: [
      "These Terms are governed by the laws of India, with exclusive jurisdiction in Pune, Maharashtra."
    ]
  },
  {
    title: "14. Contact Information",
    content: [
      "If you have any questions or notice violations, reach out to us:",
      "Bluestock Fintech Pvt Ltd",
      "📍 Pune, Maharashtra, India – 414506",
      "📞 +91 92252 20170, +91 92095 50273",
      "📧 hello@bluestock.in, ceo@bluestock.in",
      "🕘 Mon–Fri, 9 AM–5 PM IST"
    ]
  },
  {
    title: "15. Severability",
    content: [
      "If any provision is found invalid or unenforceable, the remainder of the Terms still applies fully."
    ]
  }
];

const TermsOfService = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-white py-10 px-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-indigo-100 p-8 animate-fade-in">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">Terms and Conditions</h1>
        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
          {terms.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-lg font-bold text-indigo-600 mb-1">{section.title}</h2>
              <ul className="list-disc list-inside text-gray-800 text-base space-y-1">
                {section.content.map((line, i) => (
                  <li key={i} className={line.startsWith('Note:') ? 'text-yellow-700 italic' : ''}>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate('/signup')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 
import React from "react";

const ipoList = [
  { name: "Nova Agritech Ltd.", priceBand: "39 to 41", open: "2024-01-23", close: "2024-01-24", issueSize: "143.81Cr.", issueType: "Book Built", listingDate: "2024-01-30", rhp: "https://example.com/rhp1.pdf", drhp: "https://example.com/drhp1.pdf" },
  { name: "EPACK Durable Ltd.", priceBand: "218 to 230", open: "2024-01-19", close: "2024-01-23", issueSize: "640.05Cr.", issueType: "Book Built", listingDate: "2024-01-31", rhp: "https://example.com/rhp2.pdf", drhp: "https://example.com/drhp2.pdf" },
  { name: "RK Swamy Ltd.", priceBand: "-", open: "-", close: "-", issueSize: "-", issueType: "-", listingDate: "-", rhp: "#", drhp: "#" },
  { name: "OYO Oravel Stays Ltd.", priceBand: "-", open: "-", close: "-", issueSize: "-", issueType: "Book Built", listingDate: "-", rhp: "#", drhp: "#" },
  { name: "boat Imagine marketing Ltd.", priceBand: "-", open: "-", close: "-", issueSize: "2000Cr.", issueType: "Book Built", listingDate: "-", rhp: "#", drhp: "#" },
  { name: "Kids Clinic India Ltd.", priceBand: "-", open: "-", close: "-", issueSize: "-", issueType: "-", listingDate: "-", rhp: "#", drhp: "#" },
  { name: "OLA Electric Mobility Ltd.", priceBand: "-", open: "-", close: "-", issueSize: "-", issueType: "Book Built", listingDate: "-", rhp: "#", drhp: "#" },
  { name: "One Mobikwik Systems Ltd.", priceBand: "-", open: "-", close: "-", issueSize: "1900Cr.", issueType: "Book Built", listingDate: "-", rhp: "#", drhp: "#" },
  { name: "ixigo Le Travenues Technology", priceBand: "-", open: "-", close: "-", issueSize: "1600Cr.", issueType: "-", listingDate: "-", rhp: "#", drhp: "#" },
  { name: "CMR Green Technologies", priceBand: "-", open: "-", close: "-", issueSize: "-", issueType: "-", listingDate: "-", rhp: "#", drhp: "#" },
  { name: "Wellness Forever", priceBand: "-", open: "-", close: "-", issueSize: "-", issueType: "-", listingDate: "-", rhp: "#", drhp: "#" },
  { name: "PKH Ventures Ltd.", priceBand: "-", open: "-", close: "-", issueSize: "-", issueType: "-", listingDate: "-", rhp: "#", drhp: "#" },
];

const IPOGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {ipoList.map((ipo, idx) => (
      <div key={idx} className="bg-white rounded-xl shadow border p-5 flex flex-col items-start transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <h3 className="font-semibold text-lg text-indigo-700 mb-2">{ipo.name}</h3>
        <div className="text-sm text-gray-700 mb-1">Price Band: <span className="font-medium">{ipo.priceBand}</span></div>
        <div className="text-sm text-gray-700 mb-1">Open: <span className="font-medium">{ipo.open}</span></div>
        <div className="text-sm text-gray-700 mb-1">Close: <span className="font-medium">{ipo.close}</span></div>
        <div className="text-sm text-gray-700 mb-1">Issue Size: <span className="font-medium">{ipo.issueSize}</span></div>
        <div className="text-sm text-gray-700 mb-1">Issue Type: <span className="font-medium">{ipo.issueType}</span></div>
        <div className="text-sm text-gray-700 mb-3">Listing Date: <span className="font-medium">{ipo.listingDate}</span></div>
        <div className="flex gap-2 mt-auto">
          <a
            href={ipo.rhp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded font-semibold text-xs hover:bg-indigo-200 transition-colors duration-200 shadow-sm"
          >
            RHP
          </a>
          <a
            href={ipo.drhp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-100 text-red-700 px-3 py-1 rounded font-semibold text-xs hover:bg-red-200 transition-colors duration-200 shadow-sm"
          >
            DRHP
          </a>
        </div>
      </div>
    ))}
  </div>
);

export default IPOGrid;

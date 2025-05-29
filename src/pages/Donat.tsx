import React, { useState } from 'react';
import { FaCopy, FaHeart, FaHandsHelping, FaStar, FaCoins } from 'react-icons/fa';
import { GiCash } from 'react-icons/gi';

const Donate: React.FC = () => {
  const walletAddress = "P1131612161";
  const [copied, setCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4" id='Donate'>
      <div className="bg-gray-900 bg-opacity-95 p-8 rounded-xl shadow-2xl max-w-2xl w-full text-center backdrop-blur-sm border border-gray-800 animate-fadeIn">
        {/* Animated header with gradient */}
        <h1 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 drop-shadow-lg">
          Support Us
        </h1>

        {/* Animated icon */}
        <div className="flex justify-center mb-6">
          <GiCash className="text-5xl text-yellow-400 animate-pulse" />
        </div>

        <div className="text-lg leading-relaxed space-y-6 mb-8">
          <p className="text-yellow-400 flex items-center justify-center gap-3 text-xl animate-pulse">
            <FaHeart className="text-2xl" /> Support Our Project
          </p>
          
          <p className="bg-gray-800 bg-opacity-60 p-4 rounded-lg border-l-4 border-yellow-400">
            Your support helps us develop the project and create new opportunities for all users.
          </p>
          
          <p className="text-yellow-400 flex items-center justify-center gap-3 text-xl">
            <FaHandsHelping className="text-2xl" /> We appreciate every donor!
          </p>
          
          <p className="bg-gray-800 bg-opacity-60 p-4 rounded-lg">
            Even a small amount makes a difference and motivates us to work harder.
          </p>
          
          <div className="text-sm bg-gray-950 p-3 rounded-lg border border-red-900 text-red-300 italic">
            <strong className="text-red-400">Important:</strong> Donations are non-refundable. Please verify the details before sending.
          </div>
          
          <p className="text-yellow-400 flex items-center justify-center gap-3 text-xl">
            Thank you for being with us! <FaStar className="text-2xl" />
          </p>
        </div>

        {/* Wallet address block */}
        <div className="mb-8">
          <p className="text-lg mb-3 text-gray-300">Address for donation: Payeer wallet</p>
          <div className="relative flex items-center justify-between bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-yellow-400 transition-colors">
            <span className="text-yellow-400 font-mono break-all text-left pr-4">{walletAddress}</span>
            <button
              onClick={handleCopyClick}
              className="bg-yellow-500 text-gray-900 p-3 rounded-full hover:bg-yellow-400 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex-shrink-0"
              title="Copy"
            >
              <FaCopy className="text-lg" />
            </button>
            {copied && (
              <span className="absolute -top-10 bg-green-500 text-white text-sm px-3 py-1 rounded-md animate-bounce">
                Copied!
              </span>
            )}
          </div>
        </div>

        {/* Donation button */}
        <a
          href="YOUR_DONATION_LINK_HERE"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 text-xl font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-yellow-500/30 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-500/50 animate-pulse"
        >
          Support the Project
        </a>

        {/* Additional information */}
        <div className="mt-8 text-xs text-gray-500">
          <p>You will be redirected to a secure page to complete the donation</p>
        </div>
      </div>
    </div>
  );
};

export default Donate;
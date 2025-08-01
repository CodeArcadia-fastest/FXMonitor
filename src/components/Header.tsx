
import { ArrowRightIcon, ChartBarIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
const Header = () => {
  // Mock currency data for the background
  const currencies = [
    { pair: 'USD/EUR', rate: 0.92, change: -0.002 },
    { pair: 'USD/RUB', rate: 92.45, change: +0.35 },
    { pair: 'USD/UZS', rate: 12350.0, change: +25.0 },
    { pair: 'USD/TRY', rate: 32.18, change: -0.12 },
    { pair: 'EUR/GBP', rate: 0.86, change: +0.001 },
  ];

  return (
    <header className="relative bg-gray-900 overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background elements */} 
      <div className="absolute inset-0 opacity-20">
        {/* Currency rate lines animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30"
              style={{
                top: `${15 + i * 10}%`,
                left: '-10%',
                width: '120%',
                transform: `rotate(${i % 2 === 0 ? 2 : -2}deg)`,
                animation: `moveLine${i % 2 === 0 ? 'Left' : 'Right'} 20s linear infinite`,
              }}
            ></div>
          ))}
        </div>

        {/* Currency rate cards floating in background */}
        {currencies.map((currency, index) => (
          <div
            key={index}
            className="absolute bg-gray-800/50 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-gray-700/50"
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${5 + Math.random() * 90}%`,
              width: '120px',
              animation: `float${index % 2 === 0 ? '1' : '2'} ${15 + index * 2}s infinite linear`,
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-blue-400">{currency.pair}</span>
              <span
                className={`text-xs ${
                  currency.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {currency.change >= 0 ? '↑' : '↓'} {Math.abs(currency.change)}
              </span>
            </div>
            <div className="text-sm font-bold text-white mt-1">{currency.rate.toFixed(2)}</div>
          </div>
        ))}

        {/* Currency icons floating */}
        <CurrencyDollarIcon className="absolute h-16 w-16 text-yellow-400/20 top-1/4 left-1/4 animate-pulse" />
        <CurrencyDollarIcon className="absolute h-20 w-20 text-blue-400/20 bottom-1/3 right-1/4 animate-pulse delay-1000" />
        <ChartBarIcon className="absolute h-14 w-14 text-green-400/20 top-1/3 right-1/3 animate-pulse delay-1500" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Track <span className="text-yellow-400">Currency Rates</span> in Real-Time
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
          Get live exchange rates, historical data, and currency conversion tools all in one place.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="flex items-center justify-center px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group">
            <span>View Rates</span>
            <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          
          <button className="flex items-center justify-center px-8 py-3 bg-transparent border-2 border-yellow-600 text-yellow-400 hover:bg-yellow-600/10 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <span>How It Works</span>
          </button>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes moveLineLeft {
          0% { transform: translateX(-100%) rotate(2deg); }
          100% { transform: translateX(100%) rotate(2deg); }
        }
        @keyframes moveLineRight {
          0% { transform: translateX(-100%) rotate(-2deg); }
          100% { transform: translateX(100%) rotate(-2deg); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          25% { transform: translateY(-20px) translateX(10px) rotate(2deg); }
          50% { transform: translateY(0) translateX(20px) rotate(0deg); }
          75% { transform: translateY(20px) translateX(10px) rotate(-2deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          25% { transform: translateY(10px) translateX(-10px) rotate(-2deg); }
          50% { transform: translateY(-10px) translateX(-20px) rotate(0deg); }
          75% { transform: translateY(0) translateX(-10px) rotate(2deg); }
        }
      `}</style>
    </header>
  );
};

export default Header;

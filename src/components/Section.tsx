import React, { useState, useEffect } from 'react';
import { FaBolt, FaCalculator, FaChartBar, FaDollarSign, FaArrowRight } from 'react-icons/fa';

const Section = () => {
  // Состояния для данных и конвертации
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('UZS');
  const [convertedAmount, setConvertedAmount] = useState(null);

  // Получаем курсы с API при монтировании компонента
  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Пример API (замени на свой API и ключ)
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();

        if (data.result === 'success') {
          setRates(data.rates);
          setLoading(false);
        } else {
          console.error('Ошибка получения курсов');
        }
      } catch (error) {
        console.error('Ошибка API:', error);
      }
    };
    fetchRates();
  }, []);

  // Обновление результата конвертации
  const convertCurrency = () => {
    if (!rates) return;
    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];
    if (!fromRate || !toRate) {
      setConvertedAmount(null);
      return;
    }
    const result = (amount / fromRate) * toRate;
    setConvertedAmount(result);
  };

  // Преобразуем данные для таблицы популярных курсов
  const popularPairs = [
    'EUR', 'RUB', 'UZS', 'TRY'
  ].map(to => {
    const rate = rates[to] ? rates[to] : null;
    const prevRate = null; // Можно добавить логику для изменения (change) если есть история
    return {
      pair: `USD/${to}`,
      rate,
      change: 0, // заглушка, для динамического изменения нужна история
    };
  });

  const features = [
    {
      icon: <FaBolt className="h-8 w-8 text-yellow-500" />,
      title: "Real-Time Updates",
      description: "Get currency rates updated every minute from reliable financial sources"
    },
    {
      icon: <FaCalculator className="h-8 w-8 text-blue-500" />,
      title: "Conversion Calculator",
      description: "Instantly convert any amount between currencies with our easy tool"
    },
    {
      icon: <FaChartBar className="h-8 w-8 text-green-500" />,
      title: "Historical Charts",
      description: "View 1-day to 5-year trends for any currency pair"
    },
    {
      icon: <FaDollarSign className="h-8 w-8 text-purple-500" />,
      title: "Multiple Sources",
      description: "Compare rates from different banks and exchange services"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Popular Rates Table */}
        <div className="bg-gray-50 rounded-xl p-6 mb-16 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <FaDollarSign className="h-6 w-6 text-yellow-500 mr-2" />
            Popular Exchange Rates
          </h2>
          {loading ? (
            <p>Loading rates...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Currency Pair
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Change
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Chart
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {popularPairs.map(({ pair, rate, change }) => (
                    <tr key={pair} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{pair}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {rate ? (pair === 'USD/UZS' ? rate.toFixed(0) : rate.toFixed(4)) : 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-8 w-24 bg-gray-100 rounded-md flex items-center px-2">
                          <div
                            className={`h-3 rounded-full ${change >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                            style={{ width: `${Math.min(Math.abs(change) * 100 + 20)}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-6 text-right">
            <button className="inline-flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-700">
              View all currencies <FaArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Powerful Currency Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gray-50 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Calculator */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Currency Converter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="100"
                min="0"
              />
            </div>
            <div>
              <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <select
                id="from"
                value={fromCurrency}
                onChange={e => setFromCurrency(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              >
                {rates && Object.keys(rates).map(cur => (
                  <option key={cur} value={cur}>{cur}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <select
                id="to"
                value={toCurrency}
                onChange={e => setToCurrency(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              >
                {rates && Object.keys(rates).map(cur => (
                  <option key={cur} value={cur}>{cur}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-6 p-4 bg-white rounded-md border border-gray-200">
            <div className="text-sm text-gray-500">Conversion Result</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">
              {convertedAmount !== null
                ? `${convertedAmount.toFixed(2)} ${toCurrency}`
                : '—'}
            </div>
            {convertedAmount !== null && (
              <div className="text-sm text-gray-500 mt-2">
                1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency}
              </div>
            )}
          </div>
          <button
            onClick={convertCurrency}
            className="mt-6 w-full md:w-auto px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-medium rounded-md shadow hover:shadow-md transition-all duration-300"
          >
            Convert Currency
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section;

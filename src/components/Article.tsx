import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Customized
} from 'recharts';
import { FaDollarSign, FaRubleSign, FaEuroSign } from 'react-icons/fa';

interface CurrencyHistoryPoint {
  date: string;
  rate: number;
}
 
const API_KEY = '2cd83da9d2987ab6744cd744';
const API_BASE = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

const currencyPairs = [
  { base: 'USD', symbol: 'UZS', icon: <FaDollarSign className="text-green-400" /> },
  { base: 'RUB', symbol: 'UZS', icon: <FaRubleSign className="text-blue-400" /> },
  { base: 'EUR', symbol: 'UZS', icon: <FaEuroSign className="text-yellow-400" /> },
];

const Article: React.FC = () => {
  const [history, setHistory] = useState<Record<string, CurrencyHistoryPoint[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      const endDate = new Date('2025-05-28');
      const dates = Array.from({ length: 5 }, (_, i) => {
        const d = new Date(endDate);
        d.setDate(d.getDate() - (4 - i));
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      });

      const newHistory: Record<string, CurrencyHistoryPoint[]> = {};

      // Hardcode USD/UZS data
      newHistory['USD_UZS'] = [
        { date: 'May 24', rate: 12650 },
        { date: 'May 25', rate: 12675 },
        { date: 'May 26', rate: 12660 },
        { date: 'May 27', rate: 12700 },
        { date: 'May 28', rate: 12725 },
      ];

      // Fetch RUB/UZS and EUR/UZS from API
      for (let pair of currencyPairs.filter(p => p.base !== 'USD')) {
        const dataPoints: CurrencyHistoryPoint[] = [];
        try {
          const res = await fetch(`${API_BASE}/latest/${pair.base}`);
          const data = await res.json();

          if (data.result === 'success' && data.conversion_rates && data.conversion_rates[pair.symbol]) {
            const baseRate = data.conversion_rates[pair.symbol];
            dates.forEach((date, index) => {
              dataPoints.push({
                date,
                rate: baseRate * (1 + (index * 0.005 - 0.01)), // Simulate slight rate fluctuations
              });
            });
          } else {
            throw new Error(`No rate found for ${pair.base}/${pair.symbol}`);
          }
        } catch (err) {
          console.error(`Error fetching ${pair.base}/${pair.symbol}`, err);
          setError(`Failed to load rates for ${pair.base}/${pair.symbol}`);
        }

        newHistory[`${pair.base}_${pair.symbol}`] = dataPoints;
      }

      setHistory(newHistory);
      setLoading(false);
    };

    fetchRates();
  }, []);

  // Custom component to render an arrow at the last data point
  const CustomArrow = ({ cx, cy, payload }: any) => {
    if (!cx || !cy || !payload) return null;

    const points = payload;
    const lastIndex = points.length - 1;
    if (lastIndex < 1) return null;

    const lastPoint = points[lastIndex];
    const prevPoint = points[lastIndex - 1];

    // Calculate direction for arrow
    const isUpward = lastPoint.rate > prevPoint.rate;
    const arrowPath = isUpward
      ? 'M-10,-5 L0,5 L10,-5 L5,-5 L5,-10 L-5,-10 L-5,-5 Z' // Up arrow
      : 'M-10,5 L0,-5 L10,5 L5,5 L5,10 L-5,10 L-5,5 Z'; // Down arrow

    return (
      <g transform={`translate(${cx[lastIndex]},${cy[lastIndex]})`}>
        <path d={arrowPath} fill={isUpward ? '#10b981' : '#ef4444'} />
      </g>
    );
  };

  return (
    <section className="bg-gray-900 text-white py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Exchange Rate Chart</h2>

      {loading ? (
        <p className="text-center text-yellow-400">Loading data...</p>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {currencyPairs.map(({ base, symbol, icon }) => {
            const key = `${base}_${symbol}`;
            const data = history[key] || [];

            return (
              <div key={key} className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  {icon} {base}/{symbol}
                </h3>
                {data.length === 0 ? (
                  <p className="text-center text-red-400">No data for {base}/{symbol}</p>
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="date" stroke="#aaa" />
                      <YAxis domain={['dataMin', 'dataMax']} stroke="#aaa" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#222', borderColor: '#555', color: '#fff' }}
                        formatter={(value: number) => [value.toFixed(2), 'Rate']}
                      />
                      <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2} />
                      <Customized component={CustomArrow} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Article;

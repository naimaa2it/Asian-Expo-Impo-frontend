import { useState } from 'react';

const ContainerLoadingCapacity = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Only one object with all model names combined
  const tableData = [
    {
      modelName: '11R 22.5, 295/75R22.5, 295/80R22.5, 275/70R22.5, 315/80R22.5',
      ft40: '280 pieces - $275',
      ft20: '160 pieces - $155',
      leadTime: '28-35 days'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto border border-gray-300 rounded-lg overflow-hidden shadow-sm">
      {/* Header with toggle */}
      <button
        className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-300 text-left"
        onClick={toggleExpand}
        aria-expanded={isExpanded}
      >
        <h2 className="text-lg font-semibold text-gray-800">
          Container Loading Capacity
        </h2>
        <div className="flex items-center">
          <span className="text-sm text-teal-600 mr-2 hidden sm:inline">
            {isExpanded ? 'Click to collapse' : 'Click to expand'}
          </span>
          <svg
            className={`w-5 h-5 text-teal-600 transform transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Collapsible content */}
      {isExpanded && (
        <div className="overflow-x-auto animate-fadeIn">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Model Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  40FT
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  20FT
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Lead Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {item.modelName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.ft40}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.ft20}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.leadTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContainerLoadingCapacity;
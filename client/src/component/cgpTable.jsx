const CGPATable = ({ data }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl ">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        CGPA for 2023/2024
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Metric
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Total Credit Points (TCP)
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {data.TCP}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Total Number of Units (TNU)
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {data.TNU}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                CGPA
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {data.CGPA}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CGPATable;

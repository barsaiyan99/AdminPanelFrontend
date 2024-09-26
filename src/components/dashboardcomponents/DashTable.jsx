import React, { useState } from 'react';
import { Calendar, MapPin, UserRound, SquareCheck, UserRoundPen, Trash2 } from 'lucide-react';

const DashTable = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  };

  const data = [
    { id: 1, order: '#1532', client: 'John Carter', email: 'hello@johncarter.com', date: 'Jan 30, 2024', status: 'Delivered', country: 'United States', total: '$1099.24' },
    { id: 2, order: '#1533', client: 'Jane Smith', email: 'jane@smith.com', date: 'Feb 15, 2024', status: 'Pending', country: 'Canada', total: '$599.99' },
    { id: 3, order: '#1534', client: 'Alice Johnson', email: 'alice@johnson.com', date: 'Mar 01, 2024', status: 'Pending', country: 'UK', total: '$799.50' },
    { id: 4, order: '#1535', client: 'Bob Brown', email: 'bob@brown.com', date: 'Apr 22, 2024', status: 'Cancelled', country: 'Australia', total: '$299.99' },
    { id: 5, order: '#1536', client: 'Charlie Davis', email: 'charlie@davis.com', date: 'May 30, 2024', status: 'Delivered', country: 'Germany', total: '$450.00' },
    { id: 6, order: '#1537', client: 'Dana Lee', email: 'dana@lee.com', date: 'Jun 15, 2024', status: 'Pending', country: 'France', total: '$800.75' },
  ];

  const statusClasses = {
    Delivered: 'border-green-900 text-CustomSuccessGreen bg-CustomBgSuccessGreen',
    Cancelled: 'border-red-900 text-CustomDangerRed bg-CustomBgDangerRed',
    Pending: 'border-yellow-500 text-CustomYellow bg-CustomBgYellow',
  };

  return (
    <div className="relative overflow-x-auto shadow-md  ">
      <table className="w-full text-sm text-left text-black">
        <thead className="text-md  uppercase bg-gray">
          <tr>
            <th scope="col" className="px-6 py-3">
              Order
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center gap-1">
                <UserRound size={16} />
                <p>Client</p>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <p>Date</p>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center gap-1">
                <SquareCheck size={16} />
                <p>Status</p>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <p>Country</p>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="odd:bg-white even:bg-gray-200">
              <td className="px-6 py-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={checkedItems[item.id] || false}
                  onChange={() => handleCheckboxChange(item.id)}
                  className="form-checkbox h-4 w-4 text-purple-600 bg-purple-100 border-purple-300"
                />
                {item.order}
              </td>
              <td className="px-6 py-4">
                <h1>{item.client}</h1>
                <p>{item.email}</p>
              </td>
              <td className="px-6 py-4">
                {item.date}
              </td>
              <td className="px-6 py-4">
                <p className={`border-2 inline-block py-1 px-5 rounded-lg ${statusClasses[item.status]}`}>
                  {item.status}
                </p>
              </td>
              <td className="px-6 py-4">
                {item.country}
              </td>
              <td className="px-6 py-4">
                {item.total}
              </td>
              <td className="px-6 py-4 flex gap-2">
                <a href="#" className="font-mediumhover:underline">
                  <UserRoundPen />
                </a>
                <a href="#" className="font-medium hover:underline">
                  <Trash2 />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashTable;

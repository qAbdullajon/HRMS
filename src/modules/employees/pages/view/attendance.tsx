const Attendance = () => {
  const employees = [
    { date: 'July 01, 2023', checkIn: '09:28 AM', checkOut: '07:00 PM', break: '00:30 Min', 'workingHours': '09:02 Hrs', status: 'On Time' },
    { date: 'July 01, 2023', checkIn: '09:28 AM', checkOut: '07:00 PM', break: '00:30 Min', 'workingHours': '09:02 Hrs', status: 'On Time' },
    { date: 'July 01, 2023', checkIn: '09:28 AM', checkOut: '07:00 PM', break: '00:30 Min', 'workingHours': '09:02 Hrs', status: 'Late' },
    { date: 'July 01, 2023', checkIn: '09:28 AM', checkOut: '07:00 PM', break: '00:30 Min', 'workingHours': '09:02 Hrs', status: 'On Time' },
    { date: 'July 01, 2023', checkIn: '09:28 AM', checkOut: '07:00 PM', break: '00:30 Min', 'workingHours': '09:02 Hrs', status: 'Late' },
    { date: 'July 01, 2023', checkIn: '09:28 AM', checkOut: '07:00 PM', break: '00:30 Min', 'workingHours': '09:02 Hrs', status: 'On Time' },
    { date: 'July 01, 2023', checkIn: '09:28 AM', checkOut: '07:00 PM', break: '00:30 Min', 'workingHours': '09:02 Hrs', status: 'Late' }
  ];

  return (
    <div className="p-6 w-full">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3 font-light text-gray">Date</th>
              <th className="pb-3 font-light text-gray">Check In</th>
              <th className="pb-3 font-light text-gray">Check Out</th>
              <th className="pb-3 font-light text-gray">Break</th>
              <th className="pb-3 font-light text-gray">Working Hours</th>
              <th className="pb-3 font-light text-gray">Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="py-4 font-light text-dark">
                  {employee.date}
                </td>
                <td className="py-4 font-light text-dark">{employee.checkIn}</td>
                <td className="py-4 font-light text-dark">{employee.checkOut}</td>
                <td className="py-4 font-light text-dark">{employee.break}</td>
                <td className="py-4 font-light text-dark">{employee.workingHours}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${employee.status === 'On Time'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                    }`}>
                    {employee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Attendance
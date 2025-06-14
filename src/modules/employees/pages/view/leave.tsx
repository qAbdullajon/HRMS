const employees = [
  { date: "July 01, 2023", duration: "Apr 06 - Apr 10", days: "8 Days", 'reportingManager': "Mark Willians", status: "Pending" },
  { date: "July 01, 2023", duration: "Apr 06 - Apr 10", days: "8 Days", 'reportingManager': "Mark Willians", status: "Reject" },
  { date: "July 01, 2023", duration: "Apr 06 - Apr 10", days: "8 Days", 'reportingManager': "Mark Willians", status: "Approved" },
  { date: "July 01, 2023", duration: "Apr 06 - Apr 10", days: "8 Days", 'reportingManager': "Mark Willians", status: "Approved" },
  { date: "July 01, 2023", duration: "Apr 06 - Apr 10", days: "8 Days", 'reportingManager': "Mark Willians", status: "Pending" },
  { date: "July 01, 2023", duration: "Apr 06 - Apr 10", days: "8 Days", 'reportingManager': "Mark Willians", status: "Approved" },
  { date: "July 01, 2023", duration: "Apr 06 - Apr 10", days: "8 Days", 'reportingManager': "Mark Willians", status: "Approved" }
];

const Leave = () => {
  return (
    <div className="p-6 w-full">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3 font-light text-gray">Date</th>
              <th className="pb-3 font-light text-gray">Duration</th>
              <th className="pb-3 font-light text-gray">Days</th>
              <th className="pb-3 font-light text-gray">Reporting Manager</th>
              <th className="pb-3 font-light text-gray">Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="py-4 font-light text-dark">
                  {index + 1}
                </td>
                <td className="py-4 font-light text-dark">{employee.date}</td>
                <td className="py-4 font-light text-dark">{employee.duration}</td>
                <td className="py-4 font-light text-dark">{employee.days}</td>
                <td className="py-4 font-light text-dark">{employee.reportingManager}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${employee.status === 'Approved'
                    ? 'bg-green-100 text-green-700'
                    : employee.status === 'Reject' ? 'bg-[#EFBE121A] text-[#EFBE12]' : 'text-red-500 bg-red-50'
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

export default Leave
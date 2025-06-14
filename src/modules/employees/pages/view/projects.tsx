const employees = [
  { projectName: "Amongus - Discovery Phase", startDate: "Feb 01, 2023", finishDate: "Mar 05, 2023", status: "In Process" },
  { projectName: "Amongus - Discovery Phase", startDate: "Feb 01, 2023", finishDate: "Mar 05, 2023", status: "In Process" },
  { projectName: "Amongus - Discovery Phase", startDate: "Feb 01, 2023", finishDate: "Mar 05, 2023", status: "Completed" },
  { projectName: "Amongus - Discovery Phase", startDate: "Feb 01, 2023", finishDate: "Mar 05, 2023", status: "Completed" },
  { projectName: "Amongus - Discovery Phase", startDate: "Feb 01, 2023", finishDate: "Mar 05, 2023", status: "In Process" },
  { projectName: "Amongus - Discovery Phase", startDate: "Feb 01, 2023", finishDate: "Mar 05, 2023", status: "Completed" },
  { projectName: "Amongus - Discovery Phase", startDate: "Feb 01, 2023", finishDate: "Mar 05, 2023", status: "Completed" }
];

const Projects = () => {
  return (
    <div className="p-6 w-full">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3 font-light text-gray">Sr. No.</th>
              <th className="pb-3 font-light text-gray">Project Name</th>
              <th className="pb-3 font-light text-gray">Start Date</th>
              <th className="pb-3 font-light text-gray">Finish Date</th>
              <th className="pb-3 font-light text-gray">Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="py-4 font-light text-dark">
                  {index + 1}
                </td>
                <td className="py-4 font-light text-dark">{employee.projectName}</td>
                <td className="py-4 font-light text-dark">{employee.startDate}</td>
                <td className="py-4 font-light text-dark">{employee.finishDate}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${employee.status === 'Completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-[#EFBE121A] text-[#EFBE12]'
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

export default Projects

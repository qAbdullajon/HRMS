import React, { useState } from 'react';
import { Calendar, ChevronDown, Users, Briefcase, Clock, MapPin, UserCheck, Triangle, ChevronLeft, ChevronRight, EllipsisVertical } from 'lucide-react';

interface AttendanceData {
  day: string;
  present: number;
  late: number;
  absent: number;
}

const Dashboard = () => {

  const stats = [
    { title: 'Total Employee', value: '560', change: '+5%', trend: 'up', period: 'Update: July 16, 2023' },
    { title: 'Total Applicant', value: '1050', change: '+8%', trend: 'up', period: 'Update: July 16, 2023' },
    { title: 'Today Attendance', value: '470', change: '-2%', trend: 'down', period: 'Update: July 16, 2023' },
    { title: 'Total Projects', value: '250', change: '+12%', trend: 'up', period: 'Update: July 16, 2023' }
  ];

  const employees = [
    { name: 'Leonie Watson', designation: 'Team Lead - Design', type: 'Office', checkIn: '09:27 AM', status: 'On Time' },
    { name: 'Darlene Robertson', designation: 'Web Designer', type: 'Office', checkIn: '10:15 AM', status: 'Late' },
    { name: 'Jacob Jones', designation: 'Medical Assistant', type: 'Remote', checkIn: '10:24 AM', status: 'Late' },
    { name: 'Kathryn Murphy', designation: 'Marketing Coordinator', type: 'Office', checkIn: '09:10 AM', status: 'On Time' },
    { name: 'Leslie Alexander', designation: 'Data Analyst', type: 'Office', checkIn: '09:15 AM', status: 'On Time' },
    { name: 'Ronald Richards', designation: 'Python Developer', type: 'Remote', checkIn: '09:29 AM', status: 'On Time' },
    { name: 'Jenny Wilson', designation: 'React JS Developer', type: 'Remote', checkIn: '11:30 AM', status: 'Late' }
  ];

  const [currentMonth, setCurrentMonth] = useState(1); // February = 1 (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number): number => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const calendarDays = generateCalendarDays();

  const startDate = new Date(2025, 1, 6);
  const endDate = new Date(2025, 1, 8);

  const scheduleEvents = [
    {
      date: "Wednesday, 06 July 2023",
      events: [
        {
          time: "09:30",
          title: "Practical Task Review",
          subtitle: "UI/UX Designer"
        },
        {
          time: "12:00",
          title: "Resume Review",
          subtitle: "Magento Developer"
        },
        {
          time: "01:30",
          title: "Final HR Round",
          subtitle: "Sales Manager"
        }
      ]
    },
    {
      date: "Thursday, 07 July 2023",
      events: [
        {
          time: "09:30",
          title: "Practical Task Review",
          subtitle: "Front end Developer"
        },
        {
          time: "11:00",
          title: "TL Meeting",
          subtitle: "React JS"
        }
      ]
    }
  ];

  const attendanceData: AttendanceData[] = [
    { day: 'Mon', present: 60, late: 30, absent: 10 },
    { day: 'Tue', present: 60, late: 20, absent: 20 },
    { day: 'Wed', present: 50, late: 25, absent: 25 },
    { day: 'Thu', present: 60, late: 30, absent: 10 },
    { day: 'Fri', present: 75, late: 15, absent: 10 },
    { day: 'Sat', present: 45, late: 25, absent: 30 },
    { day: 'Sun', present: 50, late: 35, absent: 15 }
  ];

  const maxHeight = 280;

  const getBarHeight = (percentage: number): number => {
    return (percentage / 100) * maxHeight;
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-6">

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border">
                  <div className='px-6 pt-6'>
                    <div className='flex items-center gap-[10px]'>
                      <div className="p-4 bg-blue-50 rounded-[5px]">
                        {index === 0 && <Users className="w-6 h-6 text-primary-color" />}
                        {index === 1 && <Briefcase className="w-6 h-6 text-primary-color" />}
                        {index === 2 && <UserCheck className="w-6 h-6 text-primary-color" />}
                        {index === 3 && <Clock className="w-6 h-6 text-primary-color" />}
                      </div>
                      <p className="text-sm text-gray-500">{stat.title}</p>
                    </div>
                    <div className="flex items-center justify-between mb-2 mt-[10px]">
                      <h3 className="text-[30px] text-black font-bold mb-1">{stat.value}</h3>
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-sm text-sm ${stat.trend === 'up' ? 'text-success bg-success-bg' : 'text-danger bg-danger-bg'}`}>
                        {stat.trend === 'up' ? <Triangle className='w-4 h-4 fill-success' /> : <Triangle className="w-4 h-4 fill-danger rotate-z-180" />}
                        {stat.change}
                      </div>
                    </div>
                  </div>
                  <p className="text-[14px] px-6 py-[10px] border-t border-gray/20 text-gray mt-1">{stat.period}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white lg:row-span-2 rounded-lg shadow-sm border p-6 w-full mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">My Schedule</h3>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
            </div>

            <div className="">
              <div className='flex items-center justify-between mb-2'>
                <button
                  onClick={prevMonth}
                  className="w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <h4 className="font-medium text-gray-900">{months[currentMonth]}, {currentYear}</h4>
                <button
                  onClick={nextMonth}
                  className="w-8 h-8 flex items-center justify-center bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-xs text-center mb-3">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="py-2 font-medium text-gray-500">{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 relative">
                {calendarDays.map((day, index) => {
                  const currentDate = day ? new Date(currentYear, currentMonth, day) : null;
                  const isInRange = currentDate && currentDate >= startDate && currentDate <= endDate;
                  const isStart = currentDate && currentDate.getTime() === startDate.getTime();
                  const isEnd = currentDate && currentDate.getTime() === endDate.getTime();
                  const isSingleDay = startDate.getTime() === endDate.getTime();

                  return (
                    <div
                      key={index}
                      className="aspect-square flex items-center justify-center text-sm relative"
                    >
                      {day && (
                        <>
                          {isInRange && (
                            <div className={`absolute bottom-2 top-2 inset-0 ${isStart ? 'rounded-l-full left-2' : ''} ${isEnd ? 'rounded-r-full right-2' : ''} ${isSingleDay ? 'rounded-full' : ''}`}
                              style={{
                                backgroundColor: 'rgba(113, 82, 243, 0.1)',
                                zIndex: 0
                              }}
                            />
                          )}

                          <button
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors relative z-10 ${isStart || isEnd
                              ? 'bg-purple-600 text-white'
                              : isInRange
                                ? 'text-purple-600'
                                : 'text-gray-700 hover:bg-gray-100'
                              }`}
                          >
                            {day}
                          </button>

                          {isInRange && !isEnd && (
                            <div className="absolute top-1/2 right-0 w-1/2 h-1 transform -translate-y-1/2 z-0"></div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className='w-full h-[1px] mt-2 mb-4 bg-[#A2A1A81A]'></div>

            {/* Schedule Events */}
            <div className="space-y-6">
              {scheduleEvents.map((daySchedule, dayIndex) => (
                <div key={dayIndex}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900 text-sm">{daySchedule.date}</h4>
                    <EllipsisVertical className="w-4 h-4 text-gray-400" />
                  </div>

                  <div className="space-y-4">
                    {daySchedule.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="flex items-start gap-4">
                        <div className="text-sm font-semibold text-gray-900 min-w-[45px]">
                          {event.time}
                        </div>
                        <div className="flex-1 relative">
                          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
                          <div className="pl-4">
                            <div className="text-xs text-gray-500 mb-1">{event.subtitle}</div>
                            <h5 className="font-medium text-gray-900 text-sm">{event.title}</h5>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-semibold text-gray-800">Attendance Overview</h2>
              <div className="flex items-center gap-2 border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50">
                <span className="text-sm text-gray-600">Today</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Chart Container */}
            <div className="relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 h-80 flex flex-col justify-between text-xs text-gray-500 -ml-8">
                <span>100%</span>
                <span>80%</span>
                <span>60%</span>
                <span>40%</span>
                <span>20%</span>
                <span>0</span>
              </div>

              {/* Chart area */}
              <div className="ml-4 pl-4 border-l border-gray-200">
                <div className="flex items-end justify-between gap-4 h-80">
                  {attendanceData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center gap-3">
                      {/* Stacked bars with gaps */}
                      <div className="relative flex flex-col-reverse w-3 gap-2.5">
                        {/* Present (Blue) */}
                        <div
                          className="w-full bg-blue-500 rounded-sm"
                          style={{
                            height: `${getBarHeight(data.present)}px`,
                          }}
                        />
                        {/* Late (Orange) */}
                        <div
                          className="w-full bg-orange-400 rounded-sm"
                          style={{
                            height: `${getBarHeight(data.late)}px`,
                          }}
                        />
                        {/* Absent (Red) */}
                        <div
                          className="w-full bg-red-500 rounded-sm"
                          style={{
                            height: `${getBarHeight(data.absent)}px`,
                          }}
                        />
                      </div>

                      {/* Day label */}
                      <span className="text-sm text-gray-600 font-medium">
                        {data.day}
                      </span>
                    </div>
                  ))}
                </div>
              </div>


            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                <span className="text-sm text-gray-600">Absent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-400 rounded-sm"></div>
                <span className="text-sm text-gray-600">Late</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                <span className="text-sm text-gray-600">Present</span>
              </div>
            </div>
          </div>

          {/* Employee List */}
          <div className="lg:col-span-4 bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Attendance Overview</h3>
              <button className="text-sm text-blue-600 hover:underline">View All</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b">
                    <th className="pb-3 font-medium">Employee Name</th>
                    <th className="pb-3 font-medium">Designation</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Check In Time</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium">{employee.name}</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-600">{employee.designation}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          {employee.type === 'Office' ? (
                            <MapPin className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Clock className="w-4 h-4 text-green-600" />
                          )}
                          <span className="text-sm">{employee.type}</span>
                        </div>
                      </td>
                      <td className="py-4 text-gray-600">{employee.checkIn}</td>
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
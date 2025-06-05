import { Apple, Bell, Briefcase, CalendarDays, ChevronDown, ClipboardList, Home, Moon, Search, Settings, Sun, Users } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { NavLink, Outlet } from "react-router-dom";

const menuItems = [
  { icon: <Home className="w-5 h-5" />, label: "Dashboard", path: "/" },
  { icon: <Users className="w-5 h-5" />, label: "All Employees", path: "/employees" },
  { icon: <ClipboardList className="w-5 h-5" />, label: "Attendance", path: "/attendance" },
  { icon: <Briefcase className="w-5 h-5" />, label: "Jobs", path: "/jobs" },
  { icon: <CalendarDays className="w-5 h-5" />, label: "Leaves", path: "/leaves" },
  { icon: <Settings className="w-5 h-5" />, label: "Settings", path: "/settings" },
];

export default function MainLayout() {
  const { theme, setTheme } = useTheme()
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  return (
    <div className="flex min-h-screen dark:bg-[#16151c] text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white flex flex-col justify-between">
        <div>
          <div className="p-6 font-bold text-xl flex items-center gap-4">
            <div className="flex items-center justify-center w-9 h-9 bg-primary-color rounded-full">
              <Apple color="white" size={20} />
            </div>
            <span>HRMS</span>
          </div>
          <nav className="flex flex-col gap-1 px-4">
            {menuItems.map((item, i) => (
              <NavLink
                to={item.path}
                key={i}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-r-lg text-base font-medium w-full transition-all duration-300
        ${isActive ? "bg-[#7152F30D] text-primary-color" : "text-gray-700 hover:bg-[#7152F30D] hover:text-primary-color"}`
                }
              >
                {/* isActive ni shu yerda ham ishlating */}
                {({ isActive }) => (
                  <>
                    <div
                      className={`w-[3px] h-12 rounded-sm transition-all duration-300 ${isActive ? "bg-primary-color" : ""
                        }`}
                    ></div>
                    {item.icon}
                    {item.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>


        </div>
        <div className="p-4 flex justify-between items-center max-w-[220px] mx-auto w-full">
          <button onClick={toggleTheme} className={`${theme === "dark" ? "bg-primary-color text-white" : "text-black"} flex items-center gap-2 text-sm py-[13px] px-[18px] rounded-md`}>
            <Sun className="w-4 h-4" />
            Light
          </button>
          <button onClick={toggleTheme} className={`${theme === "light" ? "bg-primary-color text-white" : "text-black"} flex items-center gap-2 text-sm py-[13px] px-[18px] rounded-md`}>
            <Moon className="w-4 h-4" />
            Dark
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center px-6 py-4 bg-white sticky top-0 z-30 shadow-sm">
          <div>
            <p className="text-xl font-semibold flex items-center gap-1">
              Hello Robert <span>👋</span>
            </p>
            <p className="text-sm text-gray-500">Good Morning</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={24} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-[15px] rounded-lg bg-white shadow-sm text-base focus:outline-none"
              />
            </div>

            {/* Notification icon */}
            <button className="w-12 h-12 flex items-center justify-center rounded-md hover:bg-gray-100 transition">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3 bg-white px-2 py-3 rounded-md border border-[#A2A1A833] cursor-pointer transition">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Robert Allen"
                className="w-8 h-8 rounded-md object-cover"
              />
              <div className="text-sm text-left leading-tight">
                <div className="font-medium">Robert Allen</div>
                <div className="text-gray-500 text-xs">HR Manager</div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button"
import { BriefcaseBusiness, Calendar, CalendarX, Folder, Mail, PencilLine, User } from "lucide-react"
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

const navigationItems = [
	{
		name: "Profile",
		href: "",
		icon: User,
	},
	{
		name: "Attendance",
		href: "/attendance",
		icon: Calendar,
	},
	{
		name: "Projects",
		href: "/projects",
		icon: Folder,
	},
	{
		name: "Leave",
		href: "/leave",
		icon: CalendarX,
	},
];

const ViewEmployeeLayout = () => {
	const { pathname } = useLocation();
	const params = useParams()

	const isActive = (href: string) => {
		const array = pathname.split('/')
		console.log(href, `/${array[3]}`);

		if (array.length === 3 && href === "") {
			return true
		} else if (href === `/${array[3]}`) {
			return true
		}
	};
	return (
		<div className="border border-[#A2A1A833] p-5 rounded-[10px]">
			<div className="flex items-end justify-between pb-[30px] border-b border-[#A2A1A833]">
				<div className="flex gap-4">
					<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s" alt="" className="w-[100px] h-[100px] rounded-[10px] object-cover" />
					<div>
						<h3 className="text-dark font-semibold text-2xl ">Brooklyn Simmons</h3>
						<p className="text-dark font-light text-base flex items-center gap-[10px] pt-2">
							<BriefcaseBusiness />
							<span>Project Manager</span>
						</p>
						<p className="text-dark font-light text-base flex items-center gap-[10px] pt-2">
							<Mail />
							<span>brooklyn.s@example.com</span>
						</p>
					</div>
				</div>
				<Button className="w-fit text-white font-light">
					<PencilLine />
					<span>Edit Profile</span>
				</Button>
			</div>
			<div className="flex pt-5 gap-10">
				<div className="w-64">
					<nav className="rounded-[10px] overflow-hidden border border-[#A2A1A833]">
						{navigationItems.map((item) => {
							const Icon = item.icon;
							return (
								<Link key={item.name} to={`/employees/${params.id}${item.href}`} className={`flex items-center px-5 py-4 text-base font-light transition-colors ${isActive(item.href)
									? "bg-primary-color text-white font-semibold"
									: "text-dark hover:bg-gray-100"
									}`}>
									<Icon className="w-5 h-5 mr-3" />
									<span>{item.name}</span>
								</Link>
							);
						})}
					</nav>
				</div>
				<Outlet />
			</div>
		</div>
	)
}

export default ViewEmployeeLayout
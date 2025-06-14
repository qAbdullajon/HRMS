import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDownToLine, BriefcaseBusiness, Eye, FileText, LockKeyhole, User } from "lucide-react"

const ViewProfile = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="personalInformation" className="font-semibold">
        <TabsList className="pb-5 gap-5">
          <TabsTrigger value="personalInformation">
            <User strokeWidth={2.5} className="!w-5 !h-5" />
            <span>Personal Information</span>
          </TabsTrigger>
          <TabsTrigger value="professionalInformation">
            <BriefcaseBusiness strokeWidth={2.5} className="!w-4 !h-4" />
            <span>Professional Information</span>
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText strokeWidth={2.5} className="!w-4 !h-4" />
            <span>Documents</span>
          </TabsTrigger>
          <TabsTrigger value="accountAccess">
            <LockKeyhole strokeWidth={2.5} className="!w-4 !h-4" />
            <span>Account Access</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personalInformation">
          <div className="flex-1 grid grid-cols-2 gap-6">
            <div className="space-y-7">
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">First Name</span>
                <span className="text-dark font-light text-base">Brooklyn</span>
              </div>
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">Mobile Number</span>
                <span className="text-dark font-light text-base">(702) 555-0122</span>
              </div>
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">Date of Birth</span>
                <span className="text-dark font-light text-base">July 14, 1995</span>
              </div>
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">Gender</span>
                <span className="text-dark font-light text-base">Female</span>
              </div>
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">Address</span>
                <span className="text-dark font-light text-base">2464 Royal Ln. Mesa, New Jersey</span>
              </div>
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">State</span>
                <span className="text-dark font-light text-base">United State</span>
              </div>
            </div>
            <div className="space-y-7">
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">Last Name</span>
                <span className="text-dark font-light text-base">Simmons</span>
              </div>
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">Email Address</span>
                <span className="text-dark font-light text-base">brooklyn.s@example.com</span>
              </div>
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">Marital Status</span>
                <span className="text-dark font-light text-base">Married</span>
              </div>
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">Nationality</span>
                <span className="text-dark font-light text-base">America</span>
              </div>
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">City</span>
                <span className="text-dark font-light text-base">California</span>
              </div>
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">Zip Code</span>
                <span className="text-dark font-light text-base">35624</span>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="professionalInformation">
          <div className="flex-1 grid grid-cols-2 gap-6">
            <div className="space-y-7">
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">Employee ID</span>
                <span className="text-dark font-light text-base">879912390</span>
              </div>
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">Employee Type</span>
                <span className="text-dark font-light text-base">Office</span>
              </div>
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">Department</span>
                <span className="text-dark font-light text-base">Project Manager</span>
              </div>
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">Working Days</span>
                <span className="text-dark font-light text-base">5 Days</span>
              </div>
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">Office Location</span>
                <span className="text-dark font-light text-base">2464 Royal Ln. Mesa, New Jersey</span>
              </div>
            </div>
            <div className="space-y-7">
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">User Name</span>
                <span className="text-dark font-light text-base">brooklyn_simmons</span>
              </div>
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">Email Address</span>
                <span className="text-dark font-light text-base">brooklyn.s@example.com</span>
              </div>
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">Designation</span>
                <span className="text-dark font-light text-base">Project Manager</span>
              </div>
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">Joining Date</span>
                <span className="text-dark font-light text-base">July 10, 2022</span>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="documents">
          <div className="grid grid-cols-2 gap-5">
            <div className="border border-[#A2A1A833] rounded-[10px] flex justify-between items-center p-4">
              <p className="text-base font-light text-dark">Appointment Letter.pdf</p>
              <div className="flex items-center gap-4">
                <button className="w-8 h-8 hover:bg-gray-100 rounded-md flex items-center justify-center">
                  <Eye />
                </button>
                <button className="w-8 h-8 hover:bg-gray-100 rounded-md flex items-center justify-center">
                  <ArrowDownToLine />
                </button>
              </div>
            </div>
            <div className="border border-[#A2A1A833] rounded-[10px] flex justify-between items-center p-4">
              <p className="text-base font-light text-dark">Appointment Letter.pdf</p>
              <div className="flex items-center gap-4">
                <button className="w-8 h-8 hover:bg-gray-100 rounded-md flex items-center justify-center">
                  <Eye />
                </button>
                <button className="w-8 h-8 hover:bg-gray-100 rounded-md flex items-center justify-center">
                  <ArrowDownToLine />
                </button>
              </div>
            </div>
            <div className="border border-[#A2A1A833] rounded-[10px] flex justify-between items-center p-4">
              <p className="text-base font-light text-dark">Appointment Letter.pdf</p>
              <div className="flex items-center gap-4">
                <button className="w-8 h-8 hover:bg-gray-100 rounded-md flex items-center justify-center">
                  <Eye />
                </button>
                <button className="w-8 h-8 hover:bg-gray-100 rounded-md flex items-center justify-center">
                  <ArrowDownToLine />
                </button>
              </div>
            </div>
            <div className="border border-[#A2A1A833] rounded-[10px] flex justify-between items-center p-4">
              <p className="text-base font-light text-dark">Appointment Letter.pdf</p>
              <div className="flex items-center gap-4">
                <button className="w-8 h-8 hover:bg-gray-100 rounded-md flex items-center justify-center">
                  <Eye />
                </button>
                <button className="w-8 h-8 hover:bg-gray-100 rounded-md flex items-center justify-center">
                  <ArrowDownToLine />
                </button>
              </div>
            </div>
            <div className="border border-[#A2A1A833] rounded-[10px] flex justify-between items-center p-4">
              <p className="text-base font-light text-dark">Appointment Letter.pdf</p>
              <div className="flex items-center gap-4">
                <button className="w-8 h-8 hover:bg-gray-100 rounded-md flex items-center justify-center">
                  <Eye />
                </button>
                <button className="w-8 h-8 hover:bg-gray-100 rounded-md flex items-center justify-center">
                  <ArrowDownToLine />
                </button>
              </div>
            </div>
            <div className="border border-[#A2A1A833] rounded-[10px] flex justify-between items-center p-4">
              <p className="text-base font-light text-dark">Appointment Letter.pdf</p>
              <div className="flex items-center gap-4">
                <button className="w-8 h-8 hover:bg-gray-100 rounded-md flex items-center justify-center">
                  <Eye />
                </button>
                <button className="w-8 h-8 hover:bg-gray-100 rounded-md flex items-center justify-center">
                  <ArrowDownToLine />
                </button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="accountAccess">
           <div className="flex-1 grid grid-cols-2 gap-6">
            <div className="space-y-7">
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">Email Address</span>
                <span className="text-dark font-light text-base">brooklyn.s@example.com</span>
              </div>
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">Skype ID</span>
                <span className="text-dark font-light text-base">brooklyn_simmons</span>
              </div>
            </div>
            <div className="space-y-7">
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">Slack ID</span>
                <span className="text-dark font-light text-base">brooklyn_simmons</span>
              </div>
              <div className="flex flex-col gap-[5px]">
                <span className="w-32 text-gray font-light text-sm">Github ID</span>
                <span className="text-dark font-light text-base">brooklyn_simmons</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

    </div>
  )
}

export default ViewProfile
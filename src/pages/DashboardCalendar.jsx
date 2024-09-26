import React from "react"
import MyCalendar from "../components/YearCalendar"
import { Plus, SearchIcon } from "lucide-react"
import pic from "/dashboard/sidebar/pic.png"
import MonthCalendar from "../components/MonthCalendar"
const DashboardCalendar = () => {
    return (
        <div className="grid grid-cols-[320px_1fr] gap-10  ">
            <div className="bg-gray-200 flex flex-col  items-center rounded-xl ">
                <button className="bg-gradient-to-r bg-white hover:bg-gray-100  mx-3 text-black px-10 py-3 my-10 rounded-xl flex items-center gap-3">
                    <Plus />
                    Create Schedule
                </button>
                <div>
                    <div className="fc-custom">
                        <MonthCalendar />
                    </div>
                    <div>
                        <form action="" className="text-black px-10">
                            <p className="my-6 text-lg">People</p>
                            <div class="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    class="pl-3 pr-4 py-2 border rounded-md w-full bg-white"
                                />
                                <span class="absolute inset-y-0 right-4 flex items-center pl-3 text-gray-500">
                                    <SearchIcon size={20} />
                                </span>
                            </div>
                            <div className="flex flex-col gap-5 mt-4 ">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={pic}
                                        alt=""
                                        className="h-10 w-10"
                                    />
                                    <div>
                                        <h1 className="text-sm">
                                            Eddie Lobanovskiy
                                        </h1>
                                        <p className="text-xs">
                                            lobanovskiy@gmail.com
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img
                                        src={pic}
                                        alt=""
                                        className="h-10 w-10"
                                    />
                                    <div>
                                        <h1 className="text-sm">
                                            Alexey stave
                                        </h1>
                                        <p className="text-xs">
                                            alexeyst@gmail.com
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img
                                        src={pic}
                                        alt=""
                                        className="h-10 w-10"
                                    />
                                    <div>
                                        <h1 className="text-sm">
                                            Anton Tkacheve
                                        </h1>
                                        <p className="text-xs">
                                            tkacheve@gmail.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/* <div className="rounded-md bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 p-[2px] mt-36">
                    <div className="bg-customBlue px-10 py-2">
                        <button className=" text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text  rounded-lg ">
                            My Schedule
                        </button>
                    </div>
                </div> */}
                <div className=" p-[2px] mt-36">
                    <button className="rounded-lg text-black bg-white hover:bg-gray-100 px-10 py-2">My Schedule</button>
                </div>
            </div>
            <div className="">
                <MyCalendar />
            </div>
        </div>
    )
}

export default DashboardCalendar

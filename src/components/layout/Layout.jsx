import React from "react";
import Navbar from "../Navbar";
import SideBar from "../SideBar";
import {HamIcon} from "lucide-react"
import { Outlet } from "react-router-dom";

const Layout = () => {
    
    return (
        <div className="flex h-screen overflow-hidden">
           
            <aside className="w-1/5 hidden lg:block ">
                <SideBar />
            </aside>
            <div className="flex-1 flex flex-col ">
                <nav className="h-20  text-white flex items-center justify-center container mx-auto  ">
                    <Navbar />
                </nav>
                <main className="flex-1 container  mx-auto  p-4 w-full overflow-auto scrollbar-hidden">
                    {/* <div className=""> */}
                        <Outlet />
                    {/* </div> */}
                </main>
            </div>
        </div>
    );
}

export default Layout;

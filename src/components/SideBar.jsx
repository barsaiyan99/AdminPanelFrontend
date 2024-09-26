import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "/dashboard/sidebar/logo.svg";
import pic from "/dashboard/sidebar/pic.png";
import arrow from "/dashboard/sidebar/ArrowRight.svg";
import dropArrow from "/dashboard/sidebar/chevron-down.svg";
import sideArrow from "/dashboard/sidebar/chevron-right.svg";
import {
    settingsIcon,
    webflowIcon,
    homeIcon,
    featureIcon,
    userIcon,
    pricingIcon,
    integrationIcon,
} from "../assets/icons";

const SideBar = () => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(null);

    const menuItems = [
        {
            id: 1,
            icon: homeIcon(activeIndex, 1),
            label: "Dashboard",
            dropdown: ["All Pages", "Report", "Product", "Task"],
            route: "/dashboard",
        },
        {
            id: 2,
            icon: featureIcon(activeIndex, 2),
            label: "Features",
            dropdown: [
                "All Pages",
                "Contact",
                "Companies",
                "Project",
                "Tasks",
                "Board",
                "Table",
                "Calendar",
            ],
        },
        {
            id: 3,
            icon: userIcon(activeIndex, 3),
            label: "Products",
            route: "/dashboard/product",  // Add route for Products
        },
        {
            id: 4,
            icon: pricingIcon(activeIndex, 4),
            label: "Invoice",
            dropdown: ["List", "Create"],
        },
        {
            id: 5,
            icon: integrationIcon(activeIndex, 5),
            label: "Integrations",
            dropdown: ["Option 1", "Option 2"],
        },
    ];

    const lowerMenuItems = [
        {
            id: 6,
            icon: settingsIcon(activeIndex, 6),
            label: "Settings",
            dropdown: ["All Pages", "Setting V1", "Setting V2", "Setting V3"],
        },
        {
            id: 7,
            icon: webflowIcon(activeIndex, 7),
            label: "Template Pages",
            dropdown: ["Option 1", "Option 2"],
        },
    ];

    const handleItemClick = (index, route) => {
        if (route) {
            navigate(route);
        } else {
            setActiveIndex(activeIndex === index ? null : index);
        }
    };

    return (
        <div className="bg-gray-200 shadow-lg p-4 h-screen w-1/5 fixed overflow-y-scroll scrollbar-hidden">
            <Link to="/dashboard" className="flex items-center mt-10 ml-6">
                <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
                <h1 className="text-xl font-bold text-black">Dashdark X</h1>
            </Link>
            <form className="mt-10">
                <input
                    type="text"
                    placeholder="Search for..."
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </form>
            <ul className="space-y-2 my-7">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        className={`relative flex flex-col items-start cursor-pointer px-4 py-2 mt-1 rounded-lg text-black ${
                            activeIndex === item.id ? "text-customGreen" : ""
                        }`}
                        onClick={() => handleItemClick(item.id, item.route)}
                    >
                        <div className="flex items-center w-full text-sm">
                            <div className="h-3 w-3 mr-3">{item.icon}</div>
                            <p className="flex-1">{item.label}</p>
                            <img
                                src={
                                    activeIndex === item.id
                                        ? sideArrow
                                        : dropArrow
                                }
                                alt="Dropdown Arrow"
                                className="ml-3 h-4 w-4"
                            />
                        </div>
                        {activeIndex === item.id && item.dropdown && (
                            <ul className="mt-2 w-full bg-white text-black rounded-lg shadow-lg text-sm">
                                {item.dropdown.map((option, i) => (
                                    <li
                                        key={i}
                                        className="px-4 py-2 rounded-md hover:bg-gray-200 border-l-4 hover:border-customGreen"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Link
                                            to={`/dashboard/${option}`}
                                            className="block w-full h-full text-black"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {option}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
            <div className="h-[1px] bg-black w-full"></div>
            <ul className="my-5 space-y-2">
                {lowerMenuItems.map((item) => (
                    <li
                        key={item.id}
                        className={`relative flex flex-col items-start cursor-pointer px-4 py-2 mt-1 rounded-lg text-black ${
                            activeIndex === item.id ? "text-customGreen" : ""
                        }`}
                        onClick={() => handleItemClick(item.id)}
                    >
                        <div className="flex items-center w-full text-sm">
                            <div className="h-3 w-3 mr-3">{item.icon}</div>
                            <p className="flex-1">{item.label}</p>
                            <img
                                src={
                                    activeIndex === item.id
                                        ? sideArrow
                                        : dropArrow
                                }
                                alt="Dropdown Arrow"
                                className="ml-3 h-4 w-4"
                            />
                        </div>
                        {activeIndex === item.id && item.dropdown && (
                            <ul className="mt-2 w-full bg-white text-black rounded-lg shadow-lg text-sm">
                                {item.dropdown.map((option, i) => (
                                    <li
                                        key={i}
                                        className="px-4 py-2 rounded-md hover:bg-gray-200 border-l-4 hover:border-customGreen"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Link
                                            to={`/dashboard/${option}`}
                                            className="block w-full h-full text-black"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {option}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
            <div className="flex gap-2 items-center px-4 py-2 text-black">
                <img src={pic} alt="Profile" className="h-8 w-8" />
                <div>
                    <p>Aditya</p>
                    <p className="text-xs">account settings</p>
                </div>
            </div>
            <div className="flex justify-center">
                <button className="mt-10 py-3 px-16 flex gap-2 hover:bg-gray-100 rounded-lg bg-white mx-3 text-black items-center">
                    <p>Get Template</p>
                    <img src={arrow} alt="Arrow" />
                </button>
            </div>
        </div>
    );
};

export default SideBar;

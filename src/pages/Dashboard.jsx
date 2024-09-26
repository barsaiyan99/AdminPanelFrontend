import React from "react";
import axios from "axios"
import {
    bagModernIcon,
    bagSimpleIcon,
    heartIcon,
    pricingIconOne,
} from "../assets/icons";
import { ArrowDown, MoveUpRightIcon } from "lucide-react";
import iphone from "/dashboard/reportpage/iphone.svg";
import iwatch from "/dashboard/reportpage/iwatch.svg";
import SmallCard from "../components/dashboardcomponents/SmallCard";
import EchartRadial from "../components/EchartRadial";
import EchartBar from "../components/EchartBar";
import CalendarButton from "../components/CalendarButton";
import pic from "/dashboard/sidebar/pic.png";
import EchartMeter from "../components/EchartMeter";
import DashTable from "../components/dashboardcomponents/DashTable";

const cardData = [
    {
        id: 1,
        icon: heartIcon,
        title: "Save Products",
        number: "50.8k",
        boxnum: "28.4%",
        type: "profit",
    },
    {
        id: 2,
        icon: bagModernIcon,
        title: "Stock Products",
        number: "23.6k",
        boxnum: "12.6%",
        type: "loss",
    },
    {
        id: 3,
        icon: bagSimpleIcon,
        title: "Sale Products",
        number: "756",
        boxnum: "3.1",
        type: "profit",
    },
    {
        id: 4,
        icon: pricingIconOne,
        title: "Average Revenue",
        number: "2.3k",
        boxnum: "11.3%",
        type: "loss",
    },
];

const Dashboard = () => {

    return (
        <div className="">
            <div className="card-section  md:grid md:grid-cols-4 gap-3 flex flex-col md:mx-auto">
                {cardData.map(({ id, icon, title, number, boxnum, type }) => (
                    <SmallCard
                        key={id}
                        icon={icon}
                        title={title}
                        number={number}
                        boxnum={boxnum}
                        type={type}
                    />
                ))}
            </div>
            <div className="md:grid md:grid-cols-4 mt-7 gap-7 flex flex-col ">
                <div className="bg-gray-200 rounded-lg p-4 max-w-[345px]">
                    <div className="flex justify-between text-md">
                        <h1 className=" text-black">Website Visitors</h1>
                        <button className="text-black text-sm p-2 bg-white rounded-md">
                            <a href={iphone} className="flex items-center gap-1" download="test.svg">
                                Export <ArrowDown color="black" size={16} />
                            </a>
                        </button>
                    </div>
                    <div className="chart mt-4 ">
                        <EchartRadial className="h-full w-full" />
                    </div>
                    <ul className="text-black p-2">
                        <li className="flex justify-between mb-7">
                            <p className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-customSaffron"></div>
                                Organic
                            </p>
                            <p>30%</p>
                        </li>
                        <li className="flex justify-between mb-7">
                            <p className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-white"></div>
                                Social
                            </p>
                            <p>50%</p>
                        </li>
                        <li className="flex justify-between">
                            <p className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-customGreen"></div>
                                Direct
                            </p>
                            <p>20%</p>
                        </li>
                    </ul>
                </div>
                <div className="bg-gray-200 rounded-lg text-black  p-8 col-span-3 text-md ">
                    <h1 className=" text-md">Revenue by Customer Type</h1>
                    <div className=" mt-2">
                        <div className="flex justify-between ">
                            <p className="flex items-center  ">
                                $240.8k
                                <div className="box ml-2 p-[2px] rounded-sm text-xs bg-CustomBgSuccessGreen text-customCardGreenText items-center flex">
                                    14.8%
                                    <MoveUpRightIcon color="#14CA74" size={12} className="ml-1" />
                                </div>
                            </p>
                            <ul className="flex gap-2 flex-wrap">
                                <li className="flex items-center text-sm ">
                                    <div className="h-2 w-2 rounded-full bg-customGreen"></div>
                                    <p className="ml-1">Current Clients</p>
                                </li>
                                <li className="flex items-center">
                                    <div className="h-2 w-2 rounded-full bg-white"></div>
                                    <p className="ml-1">Subscribers</p>
                                </li>
                                <li className="flex items-center">
                                    <div className="h-2 w-2 rounded-full bg-customSaffron"></div>
                                    <p className="ml-1">New Customers</p>
                                </li>
                                <li>
                                    <CalendarButton />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <EchartBar />
                </div>
            </div>
            <div className="md:grid md:grid-cols-3 mt-7 gap-7 flex flex-col flex-1">
                <div className="bg-gray-200 text-black p-8 rounded-lg ">
                    <h1 className="text-lg mb-7">Products</h1>
                    <div className="flex  mb-7 justify-between">
                        <p className="">Products</p>
                        <p>Price</p>
                    </div>
                    <div className="flex mb-7 items-center justify-between">
                        <div className="flex ">
                        <div className="flex bg-white mr-3 rounded-md ">
                            <img src={iphone} alt="Iphone 14 Pro Max" className="px-2 py-1" />
                        </div>
                        <span className="">
                            <h1 className="mb-1">Iphone 14 Pro Max</h1>
                            <p className="text-xs">524 in stock</p>
                        </span>
                        </div>
                        <p>$1,099.00</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex">
                        <div className="flex bg-white mr-3 rounded-md">
                            <img src={iwatch} alt="Apple Watch S8" className="px-2 py-1" />
                        </div>
                        <span className="mr-[164px]">
                            <h1 className="mb-1">Apple Watch S8</h1>
                            <p className="text-xs">320 in stock</p>
                        </span>
                        </div>
                        <p>$799.00</p>
                    </div>
                </div>
                <div className="bg-gray-200 text-black rounded-lg p-8">
                    <h1 className="mb-8 text-lg">Team Progress</h1>
                    <div className="mb-8 flex justify-between items-center">
                        <div className="flex items-center">
                            <img src={pic} alt="Team Member" className="h-8 w-8 mr-2 rounded-full" />
                            <span>
                                <h1>Sophie Moore</h1>
                                <p className="text-xs">contact@sophiemoore.com</p>
                            </span>
                        </div>
                        <p className="ml-32">33%</p>
                    </div>
                    <div className="mb-8 flex justify-between items-center">
                        <div className="flex items-center">
                            <img src={pic} alt="Team Member" className="h-8 w-8 mr-2 rounded-full" />
                            <span>
                                <h1>Sophie Moore</h1>
                                <p className="text-xs">contact@sophiemoore.com</p>
                            </span>
                        </div>
                        <p className="ml-32">60%</p>
                    </div>
                    <div className="mb-8 flex justify-between items-center">
                        <div className="flex items-center">
                            <img src={pic} alt="Team Member" className="h-8 w-8 mr-2 rounded-full" />
                            <span>
                                <h1>Matt Cannon</h1>
                                <p className="text-xs">info@mattcannon.com</p>
                            </span>
                        </div>
                        <p className="ml-[154px]">75%</p>
                    </div>
                </div>
                <div className="bg-gray-200 text-black rounded-lg  p-8 ">
                    <h1 className="text-lg">Website Visitors</h1>
                    <EchartMeter />
                    <p className="ml-[168px] -mt-40 text-md">Transactions</p>
                    <ul className="flex gap-10 mt-14 ml-20">
                        <li className="flex items-center text-sm">
                            <div className="h-2 w-2 rounded-full bg-customSaffron"></div>
                            <p className="ml-1">Sell</p>
                        </li>
                        <li className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                            <p className="ml-1">Distribute</p>
                        </li>
                        <li className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-customGreen"></div>
                            <p className="ml-1">Return</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-10 text-black hidden  lg-block">
                <div className="bg-gray-200 flex items-center px-8 py-10 rounded-t-lg">
                    <h1 className="text-lg w-1/2">Order Status</h1>
                    <div className="w-1/2 text-end flex gap-8 justify-end">
                        <CalendarButton />
                        <button className="px-4 py-2 bg-white hover:bg-gray-100 rounded-md">
                            Create Order
                        </button>
                    </div>
                </div>
                <DashTable />
            </div>
        </div>
    );
};

export default Dashboard;

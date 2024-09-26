import React, { useState, useEffect } from "react"
import Popup from "./dashboardcomponents/Popup"
import { useDispatch, useSelector } from "react-redux"
import { logoutIcon, bellIcon } from "../assets/icons"
import { userLogout } from "../redux/slices/authSlice"

const Navbar = () => {
    const [isToggled, setIsToggled] = useState(false)
    const dispatch = useDispatch()
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const handleOpenPopup = () => {
        setIsPopupOpen(true)
    }

    const handleConfirm = () => {
        console.log("Confirmed!")
        handleLogout()
        setIsPopupOpen(false)
    }

    const handleCancel = () => {
        console.log("Cancelled!")
        setIsPopupOpen(false)
    }

    const handleToggle = () => {
        setIsToggled(!isToggled)
    }

    const handleLogout = () => {
        dispatch(userLogout())
    }

    return (
        <div className="navbar  flex items-center   w-full  justify-between px-8    ">
            <Popup
                isOpen={isPopupOpen}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                message="Are you sure you want to Logout?"
            />
            <h1 className="text-lg bg-gradient-to-r from-green-800 via-green-500 to-green-700 inline-block text-transparent bg-clip-text">
                Welcome Back Aditya!
            </h1>
            <ul className="flex items-center gap-10">
                <li>
                    <button> {bellIcon()}</button>
                </li>
                <li>
                    <button
                        onClick={handleToggle}
                        className="relative inline-flex items-center cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            checked={isToggled}
                            onChange={handleToggle}
                            className="sr-only"
                        />
                        <div className="w-14 h-8 bg-gray-300 rounded-full peer transition-colors duration-300">
                            <div
                                className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${isToggled ? "translate-x-6 bg-blue-500" : ""}`}
                            ></div>
                        </div>
                    </button>
                </li>
                <li>
                    <button className="text-white " onClick={handleOpenPopup}>
                        {logoutIcon()}
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Navbar

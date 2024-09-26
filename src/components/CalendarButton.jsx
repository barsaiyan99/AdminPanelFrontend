import React, { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {Calendar,ChevronDown} from "lucide-react"

const CalendarButton = () => {
    const [startDate, setStartDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const handleButtonClick = () => {
        setOpen(!open)
    }

    return (
        <div className="relative  hidden lg:inline-block">
            <button
                onClick={handleButtonClick}
                className="flex items-center px-4 py-2 bg-white border-transparent rounded-md shadow-sm hover:bg-gray-100 focus:outline-none "
            >    
            <span><Calendar/></span>
                <span className="text-sm m-1">Jan 2024 - Dec 2024</span>
                <span><ChevronDown/></span>
                
            </button>
            {open && (
                <div
                    className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg"
                    style={{ minWidth: "200px" }}
                >
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => {
                            setStartDate(date)
                            setOpen(false)
                        }}
                        inline
                        className="react-datepicker__calendar"
                    />
                </div>
            )}
        </div>
    )
}

export default CalendarButton

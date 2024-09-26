import React from "react"
import FullCalendar from "@fullcalendar/react"
import multiMonthPlugin from "@fullcalendar/multimonth"
import "../style/YearCalendar.css"
const YearCalendar= () => {
  
    return (
        <FullCalendar
            plugins={[multiMonthPlugin]}
            initialView="multiMonthYear"
        />
    )
}

export default YearCalendar

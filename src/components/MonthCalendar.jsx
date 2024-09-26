
import React from 'react';
import  Calendar  from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
const MonthCalendar = () => {
  return (
    
      <Calendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        
      />
    
  );
};

export default MonthCalendar;

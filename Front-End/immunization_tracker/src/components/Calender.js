import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calender.css"

const Calendar = () => {
  const [events, setEvents] = useState([]);

  const handleDateClick = (arg) => {
    // Handle date click to create a new event
  };

  const handleEventClick = (arg) => {
    // Handle event click to edit or delete an event
  };

  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default Calendar;
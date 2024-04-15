// Calendar.js
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import "./Calender.css"
import Reminder from "./reminders.js";

const Calendar = () => {
  const [events, setEvents] = useState([]);

useEffect(() => {
  const user_id = window.sessionStorage.getItem('user_id');
  if (!user_id) {
    console.error('User ID not found in session storage');
    return;
  }
  axios.get(`http://localhost:5000/reminders?user_id=${user_id}`)
    .then(response => {
      console.log('Reminders fetched successfully: ', response.data);
      setEvents(response.data.map(reminder => ({ id: reminder.reminder_id, title: reminder.title, date: reminder.date })));
    })
    .catch(error => {
      console.error('Error fetching reminders: ', error);
    });
}, []);

  const addEvent = (title, date) => {
    setEvents([...events, { title, date }]);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      const eventId = clickInfo.event.id;
      axios.delete(`http://localhost:5000/reminders/${eventId}`)
        .then(response => {
          console.log('Reminder deleted successfully: ', response.data);
          clickInfo.event.remove();
          deleteEvent(eventId);
        })
        .catch(error => {
          console.error('Error deleting reminder: ', error);
        });
    }
  
  };

  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        allDaySlot={false}
      />
      <Reminder onAdd={addEvent} onDelete={deleteEvent} />
    </div>
  );
};

export default Calendar;
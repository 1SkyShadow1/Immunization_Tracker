
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reminders({ onAdd }) {
  const [newReminder, setNewReminder] = useState('');
  const [date, setDate] = useState('');
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const user_id = window.sessionStorage.getItem('user_id');
    if (!user_id) {
      console.error('User ID not found in session storage');
      return;
    }
    axios.get(`http://localhost:5000/reminders?user_id=${user_id}`)
      .then(response => {
        console.log('Reminders fetched successfully: ', response.data);
        setReminders(response.data);
      })
      .catch(error => {
        console.error('Error fetching reminders: ', error);
      });
  }, []);

  const addReminder = (event) => {
    event.preventDefault();
    const user_id = window.sessionStorage.getItem('user_id');
    if (!user_id) {
      console.error('User ID not found in session storage');
      return;
    }
    axios.post('http://localhost:5000/reminders', {user_id, title: newReminder, date })
      .then(response => {
        console.log('Reminder added successfully: ', response.data);
        onAdd(newReminder, date);
        setNewReminder('');
        setDate('');
      })
      .catch(error => {
        console.error('Error adding reminder: ', error);
      });
  }




  return (
    <div>
      <form onSubmit={addReminder}>
        <input
          type="text"
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
          required
          placeholder="Event title"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Add Reminder</button>
      </form>
    </div>
  );
}

export default Reminders;
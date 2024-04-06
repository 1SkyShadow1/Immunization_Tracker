// Reminder.js
import React, { useState } from 'react';

function Reminder({ onAdd }) {
  const [newReminder, setNewReminder] = useState('');
  const [date, setDate] = useState('');

  // const addReminder = (event) => {
  //   event.preventDefault();
  //   onAdd(newReminder, date, user_id);
  //   setNewReminder('');
  //   setDate('');
  // };
  const addReminder = (event) => {
  event.preventDefault();
  const user_id = sessionStorage.getItem('user_id');
  axios.post('http://localhost:5000/reminders', { user_id, title: newReminder, date })
    .then(response => {
      console.log('Reminder added successfully: ', response.data);
      setNewReminder('');
      setDate('');
      onAdd(newReminder, date, user_id);  // Include user_id in the onAdd call
    })
    .catch(error => {
      console.error('Error adding reminder: ', error);
    });
};
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

export default Reminder;
// Reminder.js
import React, { useState } from 'react';

function Reminder({ onAdd }) {
  const [newReminder, setNewReminder] = useState('');
  const [date, setDate] = useState('');

  const addReminder = (event) => {
    event.preventDefault();
    onAdd(newReminder, date);
    setNewReminder('');
    setDate('');
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
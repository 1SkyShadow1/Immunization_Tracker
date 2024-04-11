
const express = require('express');
const verifyJWT = require('./verifyJWT');

const router = express.Router();
const db = require('./db');

// Get All Immunization Records
router.get('/immunizations', verifyJWT, async (req, res) => {
  const userId = req.userId; // Get user ID from JWT

  try {
    const [rows] = await db.query('SELECT * FROM immunizations WHERE child_id IN (SELECT id FROM children WHERE user_id = ?)', [userId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching immunization records' });
  }
});

// Add Immunization Record
router.post('/immunizations', verifyJWT, async (req, res) => {
  const userId = req.userId;
  const { childId, vaccineName, dateAdministered, nextDueDate, notes } = req.body;

  // Validate user input (implement validation logic)

  try {
    const [result] = await db.query('INSERT INTO immunizations (child_id, vaccine_name, date_administered, next_due_date, notes) VALUES (?, ?, ?, ?, ?)', [childId, vaccineName, dateAdministered, nextDueDate, notes]);
    res.status(201).json({ message: 'Immunization record added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding immunization record' });
  }
});

// Edit Immunization Record
router.put('/immunizations/:id', verifyJWT, async (req, res) => {
  const userId = req.userId;
  const immunizationId = req.params.id;
  const { vaccineName, dateAdministered, nextDueDate, notes } = req.body;

  // Validate user input (implement validation logic)

  try {
    // Check if the record belongs to the user's child
    const [rows] = await db.query('SELECT child_id FROM immunizations WHERE id = ?', [immunizationId]);
    if (!rows.length || rows[0].child_id !== userId) {
      return res.status(401).json({ message: 'Unauthorized to edit this record' });
    }

    const [result] = await db.query('UPDATE immunizations SET vaccine_name = ?, date_administered = ?, next_due_date = ?, notes = ? WHERE id = ?', [vaccineName, dateAdministered, nextDueDate, notes, immunizationId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Immunization record not found' });
    }
    res.json({ message: 'Immunization record updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating immunization record' });
  }
});

// Delete Immunization Record
router.delete('/immunizations/:id', verifyJWT, async (req, res) => {
  const userId = req.userId;
  const immunizationId = req.params.id;

  try {
    // Check if the record belongs to the user's child
    const [rows] = await db.query('SELECT child_id FROM immunizations WHERE id = ?', [immunizationId]);
    if (!rows.length || rows[0].child_id !== userId) {
      return res.status(401).json({ message: 'Unauthorized to delete this record' });
    }

    const [result] = await db.query('DELETE FROM immunizations WHERE id = ?', [immunizationId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Immunization record not found' });
    }
    res.json({ message: 'Immunization record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting immunization record' });
  }
});

module.exports = router;



const express = require('express');
const verifyJWT = require('./verifyJWT');

const router = express.Router();
const db = require('./db');

// Get All Children
router.get('/children', verifyJWT, async (req, res) => {
  const userId = req.userId;

  try {
    const [rows] = await db.query('SELECT * FROM children WHERE user_id = ?', [userId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching child records' });
  }
});

module.exports = router;


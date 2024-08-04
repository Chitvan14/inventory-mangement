// server/routes/parties.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Fetch all parties
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM parties');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a new party
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    console.log("PARTY NAME ",name);
    await pool.query('INSERT INTO parties (name) VALUES ($1)', [name]);
    res.status(201).send('Party added');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update an existing party
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await pool.query('UPDATE parties SET name = $1 WHERE id = $2', [name, id]);
    res.status(200).send('Party updated');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

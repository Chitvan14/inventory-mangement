
const express = require('express');
const router = express.Router();
const pool = require('../db');

// Fetch all items
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Add a new item
router.post('/', async (req, res) => {
  try {
    const { item_name, mrp, net_rate, customer_rate, doctor_rate, party } = req.body;
    await pool.query(
      'INSERT INTO inventory (item_name, mrp, net_rate, customer_rate, doctor_rate, party) VALUES ($1, $2, $3, $4, $5, $6)',
      [item_name, mrp, net_rate, customer_rate, doctor_rate, party]
    );
    res.status(201).send('Item added');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update an existing item
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { item_name, mrp, net_rate, customer_rate, doctor_rate, party } = req.body;
    await pool.query(
      'UPDATE inventory SET item_name = $1, mrp = $2, net_rate = $3, customer_rate = $4, doctor_rate = $5, party = $6 WHERE id = $7',
      [item_name, mrp, net_rate, customer_rate, doctor_rate, party, id]
    );
    res.status(200).send('Item updated');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const pool = require("../db");

// Fetch all users
router.get("/", async (req, res) => {
  try {
    const { expiresIn, tokenType, idToken, email } = req.body;
    const checkRes = await pool.query('SELECT * FROM user_session WHERE email = $1', [
      email,
    ]);

    if (checkRes.rows.length > 0) {
      res.json(checkRes.rows);
    } else {
      res.status(400).send("No user found with the given email");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Add a new user
router.post("/", async (req, res) => {
  try {
    const { expiresIn, tokenType, idToken, email } = req.body;
    const userCheckRes = await pool.query(
      'SELECT * FROM user_session WHERE email = $1',
      [email]
    );

    if (userCheckRes.rows.length > 0) {
      await pool.query(
        'UPDATE user_session SET expires_in = $1, token_type = $2, id_token = $3 WHERE email = $4 RETURNING *;',
        [expiresIn, tokenType, idToken, email]
      );
      res.status(201).send("User updated");
    } else {
      await pool.query(
        'INSERT INTO user_session (expires_in, token_type, id_token, email) VALUES ($1, $2, $3, $4) RETURNING *',
        [expiresIn, tokenType, idToken, email]
      );
      res.status(201).send("User added");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;


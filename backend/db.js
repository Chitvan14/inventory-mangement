const { Pool } = require('pg');

// Configure your PostgreSQL connection pool
const pool = new Pool({
  user: 'macos',
  host: 'localhost',
  database: 'inventory_db',
  password: '1234',
  port: 5432,
});

module.exports = pool;

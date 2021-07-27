const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/aic'

// pool of clients that can connect to the db
const pool = new Pool({
    connectionString,
    ssl: true
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback); // can return a promise
  },
}
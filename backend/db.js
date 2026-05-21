const { Pool } = require("pg");

const pool = new Pool({
  user: "admin",
  host: "db",
  database: "invoicedb",
  password: "password",
  port: 5432,
});

module.exports = pool;

const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("InvoiceMate Backend Running");
});

app.get("/api/invoices", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM invoices");
    res.json(result.rows);
  } catch (err) {
    console.error("FULL ERROR:");
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.post("/api/invoices", async (req, res) => {
  try {
    const { client, amount, status } = req.body;

    const newInvoice = await pool.query(
      "INSERT INTO invoices(client, amount, status) VALUES($1,$2,$3) RETURNING *",
      [client, amount, status]
    );

    res.json(newInvoice.rows[0]);

  } catch (err) {
    console.error("FULL ERROR:");
    console.error(err);
    res.status(500).send(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

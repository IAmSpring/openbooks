// backend/index.js
const express = require("express");
const axios = require("axios");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const db = new sqlite3.Database('./pivoted.db');

// Create a pivot table structure
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS pivot_table (id INTEGER PRIMARY KEY, field1 TEXT, field2 TEXT, pivot_field TEXT)");
});

// API call function to get data
const fetchData = async () => {
  try {
    const response = await axios.get("https://api.example.com/data"); // Replace with your API URL
    return response.data;
  } catch (error) {
    console.error("API fetch error:", error);
    return [];
  }
};

// Pivot and insert data into SQLite
const pivotData = async () => {
  const data = await fetchData();

  data.forEach(row => {
    // Modify this part to pivot the data as needed
    const { id, field1, field2, pivot_field } = row;
    db.run("INSERT INTO pivot_table (id, field1, field2, pivot_field) VALUES (?, ?, ?, ?)",
      [id, field1, field2, pivot_field], (err) => {
        if (err) console.error("Insert error:", err);
      });
  });
};

app.get("/fetch-and-pivot", async (req, res) => {
  await pivotData();
  res.send("Data fetched and pivoted into the database!");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

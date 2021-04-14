// ==========
// Imports
// ==========

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// ===============
// Import Routes
// ===============
const employeesRoutes = require("./routes/employees.routes");
const departmentsRoutes = require("./routes/departments.routes");
const productsRoutes = require("./routes/products.routes");
const { model } = require("./models/employee.model");

// ===============
// Setup
// ===============

const app = express();

// ============
// Middleware
// ============

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", employeesRoutes);
app.use("/api", departmentsRoutes);
app.use("/api", productsRoutes);

app.use((req, res) => {
  res.status(404).send({ message: "Not found..." });
});

// =========================
// BackEnd to DB connection
// =========================

const dbURI =
  process.env.NODE_ENV === "production"
    ? "mongodb://localhost:27017/companyDB" // url to remote db
    : "mongodb://localhost:27017/companyDB"; // url to local db
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to the database");
});

db.on("error", (err) => {
  console.log(`Error: ${err}`);
});

// =======================
// Express server start
// =======================

const server = app.listen("8000", () => {
  console.log("Server is running on port: 8000");
});

module.exports = server;

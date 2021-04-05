const express = require("express");
const router = express.Router();
const Employee = require("../models/employee.model");

router.get("/employees", async (req, res) => {
  try {
    res.json(await Employee.find().populate("departmentId"));
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/employees/random", async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const random = Math.floor(Math.random() * count);
    const employees = await Employee.findOne().skip(random);
    employees
      ? res.json(employees)
      : res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/employees/:id", async (req, res) => {
  try {
    const employees = await Employee.findById(req.params.id);
    employees
      ? res.json(employees)
      : res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/employees", async (req, res) => {
  const { firstName, lastName, departmentId } = req.body;
  try {
    const { name } = req.body;
    const newEmployee = new Employee({
      firstName: firstName,
      lastName: lastName,
      departmentId: departmentId,
    });
    await newEmployee.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put("/employees/:id", async (req, res) => {
  const { firstName, lastName, departmentId } = req.body;
  const setObject = {};
  if (firstName) setObject.firstName = firstName;
  if (lastName) setObject.lastName = lastName;
  if (departmentId) setObject.departmentId = departmentId;
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      await Employee.updateOne({ _id: req.params.id }, { $set: setObject });
      res.json({ message: "OK" });
    } else {
      res.status(404).json({ message: "Not found..." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (employee) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: "OK" });
    } else {
      res.status(404).json({ message: "Not found..." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;

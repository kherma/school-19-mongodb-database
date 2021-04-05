const express = require("express");
const router = express.Router();
const Department = require("../models/department.model");

router.get("/departments", async (req, res) => {
  try {
    res.json(await Department.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/departments/random", async (req, res) => {
  try {
    const count = await Department.countDocuments();
    const random = Math.floor(Math.random() * count);
    const department = await Department.findOne().skip(random);
    department
      ? res.json(department)
      : res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/departments/:id", async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    department
      ? res.json(department)
      : res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/departments", async (req, res) => {
  try {
    const { name } = req.body;
    const newDepartment = new Department({ name: name });
    await newDepartment.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put("/departments/:id", async (req, res) => {
  const { name } = req.body;
  try {
    await Department.findByIdAndUpdate(
      req.params.id,
      { name: name },
      { new: true },
      (err, department) => {
        if (err) res.status(404).json({ message: "Not found..." });
        else res.json({ message: "UPDATE", data: department });
      }
    );
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete("/departments/:id", async (req, res) => {
  try {
    await Department.findByIdAndRemove(req.params.id, (err, department) => {
      if (err) res.status(404).json({ message: "Not found..." });
      else res.json({ message: "DELETE", data: department });
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;

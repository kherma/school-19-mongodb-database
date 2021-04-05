const express = require("express");
const router = express.Router();
const {
  getAll,
  getRandom,
  getById,
  addNew,
  modifyOne,
  deleteOne,
} = require("../controllers/employees.controller");

router.get("/employees", getAll);
router.get("/employees/random", getRandom);
router.get("/employees/:id", getById);
router.post("/employees", addNew);
router.put("/employees/:id", modifyOne);
router.delete("/employees/:id", deleteOne);

module.exports = router;

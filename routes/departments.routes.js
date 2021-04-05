const express = require("express");
const router = express.Router();
const {
  getAll,
  getRandom,
  getById,
  addNew,
  modifyOne,
  deleteOne,
} = require("../controllers/departments.controller");

router.get("/departments", getAll);
router.get("/departments/random", getRandom);
router.get("/departments/:id", getById);
router.post("/departments", addNew);
router.put("/departments/:id", modifyOne);
router.delete("/departments/:id", deleteOne);

module.exports = router;

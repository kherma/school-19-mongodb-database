const express = require("express");
const router = express.Router();
const {
  getAll,
  getRandom,
  getById,
  addNew,
  modifyOne,
  deleteOne,
} = require("../controllers/products.controller");

router.get("/products", getAll);
router.get("/products/random", getRandom);
router.get("/products/:id", getById);
router.post("/products", addNew);
router.put("/products/:id", modifyOne);
router.delete("/products/:id", deleteOne);

module.exports = router;

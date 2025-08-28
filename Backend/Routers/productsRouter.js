const express = require("express");

const router = express.Router();

const { getItems, createItem } = require("../Controllers/productsController")

router.get("/list", getItems);
router.post("/addItem", createItem);

module.exports = router;

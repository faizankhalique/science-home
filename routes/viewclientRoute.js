const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("viewclient", { title: "View-Client" });
});
module.exports = router;

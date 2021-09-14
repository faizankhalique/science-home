const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("404", { title: "notFound" });
});
module.exports = router;

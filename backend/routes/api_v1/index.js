const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/chat", require("./chat"));
router.use("/note", require("./note"));
router.use("/todo", require("./todo"));
router.use("/project", require("./project"));
router.use("/task", require("./task"));
router.use("/comment", require("./comment"));

module.exports = router;

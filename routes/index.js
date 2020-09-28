const router = require("express").Router();
const api = require("./api")
const path = require("path")

// api routes
router.use("/api", api);

router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../view/index.html"))
})

module.exports = router;
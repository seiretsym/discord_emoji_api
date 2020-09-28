const router = require("express").Router();

// route to specific apis
router.route("/")
  .get((req, res) => {
    console.log(req.query);
    res.json(req.query);
  })

module.exports = router;
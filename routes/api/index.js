const router = require("express").Router();
const activities = require("../../json/activities.json");
const flags = require("../../json/flags.json");
const food = require("../../json/food.json");
const nature = require("../../json/nature.json");
const objects = require("../../json/objects.json");
const people = require("../../json/people.json");
const symbols = require("../../json/symbols.json");
const travel = require("../../json/travel.json");

// create a method to check if object is empty
Object.prototype.isEmpty = function() {
  for (let key in this) {
    if (this.hasOwnProperty(key)) {
      return false;
    };
  }
  return true;
}

// route to specific apis
router.route("/emoji")
  .get((req, res) => {
    // check if query is empty
    if (!req.query.isEmpty()) {
      if (req.query.category) {
        console.log("category found")
      };
    } else {
      // if query is empty, return all categories
      
    }
    res.json(req.query);
  })

module.exports = router;
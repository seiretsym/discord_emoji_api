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

function setCategory(req) {
  switch(req.query.category) {
    case "activities":
      return {...activities};
    case "flags":
      return {...flags};
    case "food":
      return {...food};
    case "nature":
      return {...nature};
    case "objects":
      return {...objects};
    case "people":
      return {...people};
    case "symbols":
      return {...symbols};
    case "travel":
      return {...travel};
    case "all":
      return {...activities, ...flags, ...food, ...nature, ...objects, ...people, ...symbols, ...travel};
    default:
      return {
        query: req.query,
        error: `category '${req.query.category}' not found in emoji list`,
        code: 404,
      };
  }
}

// route to specific apis
router.route("/emoji")
  .get((req, res) => {
    // check if query is empty
    if (!req.query.isEmpty()) {
      const data = setCategory(req);
      res.json(data);
    } else {
      // if query is empty, return all categories
      const data = {
        ...activities,
        ...flags,
        ...food,
        ...nature,
        ...objects,
        ...people,
        ...symbols,
        ...travel
      };
      res.json(data);
    };
  })

module.exports = router;
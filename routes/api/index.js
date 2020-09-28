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

function filterCategory(req) {
  switch(req.query.category.toLowerCase()) {
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
      return [
        ...activities.activities,
        ...flags.flags,
        ...food.food,
        ...nature.nature,
        ...objects.objects,
        ...people.people,
        ...symbols.symbols,
        ...travel.travel
      ]
    default:
      return {
        query: req.query,
        error: `category '${req.query.category}' not found in emoji list`,
        code: 404,
      };
  }
}

function filterEmojis(req) {
  const query = req.query.name;
  const data = filterCategory(req);
  console.log(data[req.query.category]);
  if (!data.error) {
    let filter;
    if (req.query.category === "all") {
      filter = data.filter(emoji => emoji.name.includes(query));
    } else {
      filter = data[req.query.category].filter(emoji => emoji.name.includes(query));
    }
    return filter;
  }
  return data;
}

// route to specific apis
router.route("/emoji")
  .get((req, res) => {
    // check if query is empty
    if (!req.query.isEmpty()) {
      const data = filterEmojis(req);
      res.json(data);
    } else {
      // if query is empty, return all emojis
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
// load mongoose since we need it to define a model
var mongoose = require("mongoose");
// Seller model to store data in db
module.exports = mongoose.model("Seller", {
  name: String,
  meetingSlot: [
    {
      day: String,
      startTime: String,
      endTime: String,
      available: Boolean,
      request: Boolean,
    },
  ],
});

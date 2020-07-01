var Seller = require("./models/Seller");

// get all the sellers in the db
module.exports = function (app) {
  app.get("/api/seller", function (req, res) {
    Seller.find(function (err, sellers) {
      if (err) res.send(err);

      res.json(sellers);
    });
  });
  // post sellers to db
  app.post("/api/seller", function (req, res) {
    let meetingSlot = JSON.parse(req.body.meetingSlot);
    Seller.create(
      {
        name: req.body.name,
        meetingSlot: meetingSlot,
      },
      function (err, sellers) {
        if (err) res.send(err);

        Seller.find(function (err, sellers) {
          if (err) res.send(err);
          res.json(sellers);
        });
      }
    );
  });
  // post appointment slot to db
  app.post("/api/appointmentSlot", function (req, res) {
    let meetingSlot = req.body.meetingSlot;
    Seller.findOneAndUpdate(
      { name: req.body.name },
      { $push: { meetingSlot: meetingSlot } },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!" + err);
        }
        res.json(doc);
      }
    );
  });
  // post booking request to db
  app.post("/api/request", function (req, res) {
    let meetingSlot = req.body.meetingSlot;
    let requestId = meetingSlot._id;
    let request = meetingSlot.request;
    Seller.update(
      { _id: requestId },
      { $set: { "meetingSlot.$.request": request } }
    );
  });
};

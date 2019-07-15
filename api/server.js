const express = require("express");
const bodyParser = require("body-parser");
const db_functions = require("./libs/db_functions");
// Set up the express app
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.post("/fromSIM", function(req, res) {
  let command = req.body.Command;
  let simID = req.body.SimSid;
  let occupied = command == "occupied";
  let data = {
    ID: simID,
    occupied: occupied
  };
  console.log(data);
  db_functions.dynamo_insert(data);
});

app.get("/status", function(req, res) {
  db_functions.retrieve_status().then(function(result) {
    res.json({
      status: result
    });
  });
});

/*
app.get("/getEvents/:SIM", function(req, res) {
  SIM = req.params.SIM;
  db_sequelize.getEventsBySIM(SIM).then(function(result) {
    res.json({
      events: result
    });
  });
});
*/
app.listen(process.env.PORT || 3000, () => {
  console.log(`server running on port 3000`);
});

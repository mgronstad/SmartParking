
const express = require("express");
const bodyParser = require("body-parser");
// Set up the express app
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.post("/fromSIM", function(req, res) {
  console.log(req.body);
  let command = req.body.Command;
});

app.get("/getEvents/:SIM", function(req, res) {
  SIM = req.params.SIM;
  db_sequelize.getEventsBySIM(SIM).then(function(result) {
    res.json({
      events: result
    });
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`server running on port 3000`);
});
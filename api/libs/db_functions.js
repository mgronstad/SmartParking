const dynamoDbLib = require("./dynamodb-lib");
const responseLib = require("./response-lib");
const config = require("../config/config");
const AWS = require("aws-sdk");
const uuid = require("uuid");

AWS.config.update(config.aws_remote_config);

const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function dynamo_insert(data, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'

  // From https://www.geeksforgeeks.org/javascript-date-now/
  // Use of Date.now() function
  var fakeDate = Date(Date.now());
  // Converting the number of milliseconds in date string
  var currentDate = fakeDate.toString();

  const params = {
    TableName: "Parking_Events",
    Item: {
      //Event_ID: uuid.v1(),
      SIM_ID: data.ID,
      Occupied: data.occupied,
      PollTime: currentDate
    }
  };

  try {
    await dynamoDbLib.call("update", params);
    return responseLib.success(params.Item);
  } catch (e) {
    console.log(e);
    return responseLib.failure({ status: false });
  }
}

async function retrieve_status(params, context, callback) {
  try {
    status = await dynamoDbLib.call("get", params);
    return responseLib.success(status);
  } catch (e) {
    console.log(e);
    return responseLib.failure({ status: false });
  }
}

module.exports.dynamo_insert = dynamo_insert;

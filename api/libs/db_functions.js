const dynamoDbLib = require("./dynamodb-lib");
const responseLib = require("./response-lib");
const AWS = require("aws-sdk");
const uuid = require("uuid");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

async function dynamo_insert(data, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'

  const params = {
    TableName: "people",
    Item: {
      Event_Id: uuid.v1(),
      SIM_ID: data.ID,
      Occupied: data.name,
      Time: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return responseLib.success(params.Item);
  } catch (e) {
    console.log(e);
    return responseLib.failure({ status: false });
  }
}

module.exports.dynamo_insert = dynamo_insert;

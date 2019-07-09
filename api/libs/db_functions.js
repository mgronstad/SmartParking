import { success, failure } from "./libs/response-lib";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import AWS from "aws-sdk";
import uuid from "uuid";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function dynamo_insert(data, context, callback) {
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
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}

import { returnError } from "../helpers/returnError";

const Aflr = require("aflr").default;

const { Voice } = Aflr;
const apiKey = process.env.APIKEY;

export const handler = async (event) => {
  const queryStringParameters = event?.queryStringParameters;

  const debug = queryStringParameters?.debug || false;

  //configure aflr package
  if (Aflr.isInitialized()) {
    Aflr.reset();
  }
  try {
    Aflr.configure({
      apiKey,
      debug,
    });
  } catch (e) {
    console.log(e);
    return returnError({
      statusCode: 500,
      message: "Problem configuring the aflr package.",
    });
  }

  let parameters;
  try {
    parameters = await Voice.parameters();
  } catch (e) {
    console.log(e);
    return returnError({
      statusCode: 500,
      message: "Problem retrieving the parameters.",
    });
  }

  // return TTS URL
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(parameters),
  };
};

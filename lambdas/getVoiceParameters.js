import { returnError } from "../helpers/returnError";

const apiaudio = require("apiaudio").default;

const { Voice } = apiaudio;
const apiKey = process.env.APIKEY;

export const handler = async (event) => {
  const queryStringParameters = event?.queryStringParameters;

  const debug = queryStringParameters?.debug || false;

  //configure aflr package
  if (apiaudio.isInitialized) {
    apiaudio.reset();
  }
  try {
    apiaudio.configure({
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

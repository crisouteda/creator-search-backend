import { returnError } from "../helpers/returnError";

const Aflr = require("aflr").default;

const { Voice } = Aflr;
const apiKey = process.env.APIKEY;

export const handler = async (event) => {
  const parsedBody = JSON.parse(event?.body);

  const filters = parsedBody?.filters;

  const debug = parsedBody?.debug || false;

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

  let voices;
  try {
    console.log(Object.keys(filters).length);
    if (Object.keys(filters).length !== 0) {
      voices = await Voice.list(filters);
    } else {
      voices = await Voice.list();
    }
  } catch (e) {
    console.log(e);
    return returnError({
      statusCode: 500,
      message: "Problem retrieving the voices.",
    });
  }

  // return TTS URL
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(voices),
  };
};

import { Client, Users } from "node-appwrite";
import { convertKeys } from "./utils/convertKeys";

const apiKey = Bun.env.APPWRITE_API_KEY || process.env.APPWRITE_API_KEY;
const endPoint = Bun.env.APPWRITE_END_POINT || process.env.APPWRITE_END_POINT;
const projectId = Bun.env.APPWRITE_PROJECT_ID || process.env.APPWRITE_PROJECT_ID;

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }: any) => {
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service
  const client = new Client()
      .setEndpoint(endPoint)
      .setProject(projectId)
      .setKey(apiKey);
  const users = new Users(client);

  try {
    const response = await users.list();
    // Log messages and errors to the Appwrite Console
    // These logs won't be seen by your end users
    log(`Total users: ${response.total}`);
  } catch(err) {
    error("Could not list users: " + err.message);
  }

  // The req object contains the request data
  if (req.path === "/list-charging-station") {
    // Use res object to respond with text(), json(), or binary()
    // Don't forget to return a response!
    try {
      const endpoint = Bun.env.OPEN_CHARGE_MAP_ENDPOINT || process.env.OPEN_CHARGE_MAP_ENDPOINT || '';
      const apiKey = Bun.env.OPEN_CHARGE_MAP_X_API_KEY || process.env.OPEN_CHARGE_MAP_X_API_KEY || '';

      const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
              'x-api-key': apiKey,
              'Content-Type': 'application/json',
          },
      });

      const data = await response.json();
      const filteredData = convertKeys(data);
      const mappedData = filteredData.map((item: any) => ({
          uuid: item.uuid,
          usageCost: item.usagecost,
          addressInfo: item.addressinfo,
          connections: item.connections,
      }));

      return res.json({ message: 'Success get charging station list', code: 200, data: mappedData });
  } catch (error: any) {
      return res.json({ message: 'Failed get charging station list', code: 400, error: error.message });
  }
  }

  return res.json({
    data:"Septian"
  });
};

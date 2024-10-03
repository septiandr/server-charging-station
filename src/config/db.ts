const sdk = require('node-appwrite');

const apiKey = Bun.env.APPWRITE_API_KEY || process.env.APPWRITE_API_KEY;
const endPoint = Bun.env.APPWRITE_END_POINT || process.env.APPWRITE_END_POINT;
const projectId = Bun.env.APPWRITE_PROJECT_ID || process.env.APPWRITE_PROJECT_ID;

const client = new sdk.Client()
.setEndpoint(endPoint)
.setProject(projectId)
.setKey(apiKey);

export const databases = new sdk.Databases(client);
export const dbUser = new sdk.Users(client);
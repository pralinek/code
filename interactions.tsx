// src/index.ts
import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

const instance = process.env.SERVICENOW_INSTANCE;
const username = process.env.SERVICENOW_USERNAME;
const password = process.env.SERVICENOW_PASSWORD;

if (!instance || !username || !password) {
  console.error("Please ensure SERVICENOW_INSTANCE, SERVICENOW_USERNAME, and SERVICENOW_PASSWORD are set in the .env file");
  process.exit(1);
}

// Basic Auth for ServiceNow
const auth = Buffer.from(`${username}:${password}`).toString('base64');

app.get('/interactions', async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);

    const formattedDate = twoDaysAgo.toISOString();

    const response = await axios.get(`https://${instance}.service-now.com/api/now/table/interaction`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      params: {
        sysparm_query: `opened_at>=${formattedDate}^type=IM`,
        sysparm_limit: 100
      }
    });

    res.json(response.data.result);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {
  console.log(`ServiceNow API listening at http://localhost:${port}`);
});

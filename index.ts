import express, { Request, Response } from "express";
import os from "os";

const app = express();
const PORT = 9000;

//First Endpoint: /hello{name]
app.get("/hello", (request: Request, response: Response) => {
  const name = request.query.name || "World";
  response.json({ greeting: `Hello, ${name}` });
});

// Second Endpoint: /info
app.get("/info", (request: Request, response: Response) => {
  const requestTime = new Date().toISOString();
  const clientAddress =
    request.headers["x-forwarded-for"] ||
    request.socket.remoteAddress ||
    "Unknown";
  const hostName = os.hostname();
  const headers = request.headers;

  response.json({
    time: requestTime,
    client_address: clientAddress,
    host_name: hostName,
    headers: headers,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

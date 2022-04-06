import express from 'express';
import * as http from 'http';
import WebSocket, { WebSocketServer } from 'ws';

const port = process.env.PORT || 3000;
const app = express();

// npm i express http nodemon ws
// npx nodemon index.js

// git add .
// git commit -m "init"
// git push heroku main
// heroku logs --tail

// const wss = new WebSocketServer({ port: port });

const server = http.createServer(app);
const wss = new WebSocketServer({ server: server });

wss.on('connection', function connection(ws) {
    console.log('New Client Connected');
    ws.send('Connected to WebSocket');
    ws.on('message', (rawData) => {
        const data = rawData.toString();
        console.log('Received message from client:', data);

        // ws.send(`Server recieved message: ${data}`);

        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(`${data}`);
            }
        });
    });
});

app.get('/', async (req, res) => {
    res.send('websocket website');
});

server.listen(port, () =>
    console.log(`Listening on port ${port}.`),
);



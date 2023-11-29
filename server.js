const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("message", (message) => {
        const data = JSON.parse(message);
        // You can add game logic here, validate moves, check for a winner, etc.
        // For simplicity, we'll just broadcast the move to all connected clients.
        wss.clients.forEach((client) => {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    });

    socket.on("close", () => {
        console.log("Client disconnected");
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

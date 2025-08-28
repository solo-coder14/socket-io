// Backend/server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const productsRouter = require("./Routers/productsRouter");

const app = express();
const server = http.createServer(app);

// Socket.IO setup
// const io = new Server(server, {
//   cors: {
//     origin: process.env.FRONTEND_URL || "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// });

// Example Socket.IO event
// io.on("connection", (socket) => {
//   console.log("New client connected:", socket.id);

//   socket.on("message", (data) => {
//     console.log("Message received:", data);
//     io.emit("message", data); // broadcast to all clients
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/testing";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.error(err));

// API routes
app.use("/products", productsRouter);

// Serve React in production
const frontendPath = path.join(__dirname, "../Frontend/dist");
app.use(express.static(frontendPath));

// Catch-all for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

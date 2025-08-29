const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require('socket.io');
const path = require('path');

const productsRouter = require("./Routers/productsRouter");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production'
      ? window.location.origin
      : "http://localhost:3000"
  }
});
global.io = io;
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// database connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/testing";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("database connection successful!"))
  .catch((err) => console.log(err));

// Routes
app.use("/products", productsRouter);

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../Frontend/dist')));

  // Handle React routing, return all requests to React app
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/dist', 'index.html'));
  });
}

// Server listening
server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
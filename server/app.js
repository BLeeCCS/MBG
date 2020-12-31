const express = require("express");
const socket = require("socket.io");
const app = express();
const routes = require('./routes/main');

const activeUsers = new Set();
const PORT = 3000;

app.use(express.static("../client"));
app.use('/', routes);

const server = app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });

  const io = socket(server);

  io.on("connection", function (socket) {
    console.log("Made socket connection");
    console.log("User " + socket.id + " has joined");

    socket.on("new user", function (data) {
      socket.userId = data;
      activeUsers.add(data);
      io.emit("new user", [...activeUsers]);
    });
  
    socket.on("disconnect", () => {
      activeUsers.delete(socket.userId);
      io.emit("user disconnected", socket.userId);
    });

  });
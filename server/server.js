const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
// const delay = require("delay");
const io = new Server(server);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Socket Đã Được Kết Nối: " + socket.id);


  socket.on('customer-order',data=>{
    console.log(data);
    io.emit('customer-order-notifications',data);
  })

 socket.on('disconnect',() => {
   console.log(socket.id + 'Đã Ngắt Kết Nối');
 })
});

server.listen(3008, () => {
  console.log("listening on 3008");
});


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
//Server Lắng Nghe khi có kết nối
io.on("connection", (socket) => {
  console.log("Socket Đã Được Kết Nối: " + socket.id);
  //Socket lắng nghe khi khách hàng Order
  socket.on("customer-order", (data) => {
    console.log(data);
    //Server phát tính hiêu
    io.emit("customer-order-notifications", data);
  });
  //Server Lắng Nghe khi ngắt kết nối
  socket.on("disconnect", () => {
    console.log(socket.id + "Đã Ngắt Kết Nối");
  });
});

server.listen(3008, () => {
  console.log("listening on 3008");
});

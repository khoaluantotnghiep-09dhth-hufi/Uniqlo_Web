// const express = require("express");
var cors = require('cors')
// const app = express();
// const http = require("http");
// const { Server } = require("socket.io");
// const server = http.createServer(app);
// const bodyParser = require('body-parser')

// const io = new Server(server);
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});

app.use(cors())
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

var port =  3008;



app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
//Server Lắng Nghe khi có kết nối
io.on("connection", (socket) => {
  console.log("Socket Đã Được Kết Nối: " + socket.id);
  //Socket lắng nghe khi khách hàng Order
  socket.on("customer-order", (data) => {
    console.log("Server lấy được khách hàng order: " + JSON.stringify(data));
    //Server phát tính hiêu
    io.emit("customer-order-notifications", data);
  });

  //Socket lắng nghe khách hàng yêu cầu hủy đơn
  socket.on("customer-request-cancel-bill", (data) => {
    console.log("Server lấy được yêu cầu hủy đơn: " + JSON.stringify(data));
    io.emit("customer-request-cancel-bill-notifications",data);

  });

  //Server Lắng Nghe khi ngắt kết nối
  socket.on("disconnect", () => {
    console.log(socket.id + "Đã Ngắt Kết Nối");
  });
});

http.listen(port,'127.0.0.1', function () {
  console.log('CORS-enabled web server listening on port 3008')
})


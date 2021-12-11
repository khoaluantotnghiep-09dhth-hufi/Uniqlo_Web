const express = require("express");
const app = express();
var cors = require('cors')
const bodyParser = require('body-parser')

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
// const delay = require("delay");
const io = new Server(server);
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
//Server Lắng Nghe khi có kết nối
io.on("connection", (socket) => {
  console.log("Socket Đã Được Kết Nối: " + socket.id);
  //Socket lắng nghe khi khách hàng Order
  socket.on("customer-order", (data) => {
    console.log("Server lấy được khách hàng order: " + data);
    //Server phát tính hiêu
    io.emit("customer-order-notifications", data);
  });

  //Socket lắng nghe khách hàng yêu cầu hủy đơn
  socket.on("customer-request-cancel-bill", (data) => {
    console.log("Server lấy được yêu cầu hủy đơn: " + data);
    io.emit("customer-request-cancel-bill-notifications", data);

  });

  //Server Lắng Nghe khi ngắt kết nối
  socket.on("disconnect", () => {
    console.log(socket.id + "Đã Ngắt Kết Nối");
  });
});

server.listen(8080, () => {
  console.log("listening on 8080");
});

var cors = require('cors')
const express = require("express");
const app = express();
const bodyParser = require('body-parser')

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");


// const delay = require("delay");
const io = new Server(server);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 9001;

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});


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


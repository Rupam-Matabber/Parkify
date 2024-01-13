const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const router = require("./router");

const dotenv = require("dotenv");

dotenv.config();

const uri = "mongodb://localhost:27017/parkify"; 
const port = 6969;
const socket_port = 9696;
const connectOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

const lincenseCache = {};

mongoose
  .connect(uri, connectOptions)
  .then()
  .catch((err) => console.log("Error:" + err));

mongoose.connection.once("open", () =>
  console.log("Connected to MongoDB successfully..."),
);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
app.use(router);

let logStream = fs.createWriteStream(path.join(__dirname, "file.log"), {
  flags: "a",
});

// const net = require('net');

// const server = net.createServer(socket => {
//   try{
//     console.log('Camera connected.');

//     // Handle incoming data from the camera
//     socket.on('data', data => {
//       socket.write('Received data from camera.');
//       try{
//         // dont count get data
//         if(data.toString().includes('GET')){
//           return;
//         }
//         const requestData = JSON.parse(data.toString());
//         // const { cameraId, detected, numberPlate } = requestData;

//         console.log('Received data from camera:');
//         console.log('Camera ID:', requestData.cameraId);
//         console.log('Detected:', requestData.detected);
//         console.log('Number Plate:', requestData.numberPlate);

//         // handle

//         // TODO: create booking

//         const response = {
//           status: 'success',
//           message: 'Data received successfully.'
//         };
//         socket.write(JSON.stringify(response));
//       }
//       catch(err){
//         console.log(err);
//       }
//     });

//     socket.on('end', () => {
//       console.log('Camera disconnected.');
//     });

//     socket.on('error', err => {
//       console.error('Socket error:', err);
//     });
//   }
//   catch(err){
//     console.log(err);
//   }
// });

// const appSocket = require('http').createServer();
// const io = require('socket.io')(app);

// // Socket.io event handling
// io.on('connection', socket => {
//   console.log('Camera connected.');

//   // Handle incoming data from the camera
//   socket.on('cameraData', data => {
//     const { cameraId, detected, numberPlate } = data;

//     console.log('Received data from camera:');
//     console.log('Camera ID:', cameraId);
//     console.log('Detected:', detected);
//     console.log('Number Plate:', numberPlate);

//     // Here, you can process the data received from the camera and perform the necessary actions.
//     // For example, you can send the number plate data to the Parkify server for further processing.

//     // Respond to the camera
//     const response = {
//       status: 'success',
//       message: 'Data received successfully.'
//     };
//     socket.emit('response', response);
//   });

//   // Handle socket disconnection
//   socket.on('disconnect', () => {
//     console.log('Camera disconnected.');
//   });

//   // Handle socket errors
//   socket.on('error', err => {
//     console.error('Socket error:', err);
//   });
// });

// app.listen(port, () => {
//   console.log(`Socket server listening on port ${port}`);
// });

app.use(morgan("combined", { stream: logStream }));
app.use(morgan("combined"));

app.listen(port, () =>
  console.log(`Parkify Server running at http://localhost:${port}`),
);
// appSocket.listen(socket_port, () => console.log(`Parkify Socket server running at http://localhost:${socket_port}`));

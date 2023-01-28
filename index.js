
const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

app.use(cors());
app.options('https://test-timer-client.vercel.app/', cors())

let TIMERTIME = 120;

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
        origin: "https://test-timer-client.vercel.app/",
        methods: ['GET', 'POST'],
      }
});

io.on("connection", (socket) => {
  let userJoined = {id: socket.id, price: 5000, date: 15, assurance: 12, percent: 100, improvement: "-", timer: false, name: `Вы: ${socket.id}`}
  socket.emit('join',  userJoined)
  socket.emit('timer', TIMERTIME);
})

setInterval(StartTimer, 1000)
  function StartTimer() {
    if(TIMERTIME >= 1) {
      TIMERTIME--
      io.emit('timer', TIMERTIME); 
    } else {
      TIMERTIME = 120
      io.emit('timer', TIMERTIME); 
    }   
  } 

  
server.listen(3001, ()=> {
  console.log('start server');
})

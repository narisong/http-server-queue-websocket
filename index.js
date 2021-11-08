const express=require('express');
const ws=require('ws');
const app=express();
const port=3000;
const socketUrl='ws://localhost:7777'; // this can come from configuration
const socket=new ws(socketUrl);
const {Call, PriorityQueue}=require('./queue.js');
const pq=new PriorityQueue();

socket.addEventListener('open', function(event) {
  console.log('websocket connected');
});

socket.addEventListener('error', function(event) {
  console.log('websocket error', event);
});

socket.addEventListener('close', function(event) {
  console.log('websocket closed', event);
});

socket.addEventListener('message', function(event) {
  console.log('websocket message received', event.data);
  const data=JSON.parse(event.data)

  // For this exercise, I validate whether the incoming message is valid by checking if it contains first_name.
  // This can be improved by using strong typed descrialization.
  if(data&&data.first_name) {
    pq.insert(new Call(data.first_name, data.last_name, data.timestamp, data.sip, data.city, data.state, data.priority));
  } else {
    console.log('bad data received and discarded...', event.data)
  }
});

app.get('/pop', function(req, res) {
  res.send(pq.pop());
});

app.listen(port, () => {
  console.log(`express app listening on port ${port}`);
});

import openSocket from 'socket.io-client';

const  socket = openSocket('http://locahost:5001/');
//const  socket = openSocket('/');

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('time', 1000);
}
export { subscribeToTimer };
import express from 'express';
import path from 'path';
import { Server } from 'socket.io';

const app = express();

app.use(express.static(path.join(__dirname, '/../public')));

const expressServer = app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

const io = new Server(expressServer); 

export {
  io,
  app,
  expressServer,
}

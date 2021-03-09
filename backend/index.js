const http = require('http');
const app = require('./app');

// server port
const { PORT } = require('./config/server');

// create server
const server = http.createServer(app);

server.listen(PORT, () => console.log('Server running on PORT => ', PORT));

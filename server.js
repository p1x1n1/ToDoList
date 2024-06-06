const http = require('http');

const routes = require('./routes/router');

const server = http.createServer(routes);

const PORT = 5000;
//запускаем сервер
server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
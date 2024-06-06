const url = require('url')

//обработчики маршрута пользователя
const userRoutes = require('./userRoutes/user.router')

//обработчик запроса
const requestHandler = (req,res) => {
    const parsedUrl = url.parse(req.url, true)
    const pathname = parsedUrl.pathname

    if (pathname === '/users' || pathname.startsWith('/users/')) {
        userRoutes(req, res);
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(404);
        res.end(JSON.stringify({ message: '404 Not Found' }));
    }
}

module.exports = requestHandler;
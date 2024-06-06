const url = require('url')

const listUsers = require('./listUsers');
const createUser = require('./createUser');
const getUser = require('./getUser');
const updateUser = require('./updateUser');
const deleteUser = require('./deleteUser');

//обработчик запроса пользователей
const userRoutes = (req,res) => {
    const parsedUrl = url.parse(req.url, true)
    const pathname = parsedUrl.pathname
    const method = req.method
    res.setHeader('Content-Type', 'application/json');
    if (pathname === '/users' && method === 'GET') {
        listUsers(req, res);
    } 
    else if (pathname === '/users' && method === 'POST') {
        createUser(req, res);
    }
    else if (pathname.startsWith('/users/') && method === 'GET') {
        getUser(req, res);
    }
    else if (pathname.startsWith('/users/') && method === 'PUT') {
        updateUser(req, res);
    }
    else if (pathname.startsWith('/users/') && method === 'DELETE') {
        deleteUser(req, res);
    }
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: '404 Not Found' }));
    }
}

module.exports = userRoutes;
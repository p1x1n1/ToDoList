const data = require('../../data');

module.exports = (req,res) =>{
    const id = parseInt(req.url.split('/')[2]);
    const isDelete = data.deleteUser(id);

    if (isDelete){
        res.writeHead(200);
        res.end(JSON.stringify({ message: `User with id = ${id} deleted` }));
    }
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: `User with id = ${id} not found` }));
    }
}
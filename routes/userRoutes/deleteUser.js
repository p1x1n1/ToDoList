const data = require('../../db.user');

module.exports = async (req,res) =>{
    try{
        const id = parseInt(req.url.split('/')[2]);
        const isDelete = await data.deleteUser(id);

        if (isDelete){
            res.writeHead(200);
            res.end(JSON.stringify({ message: `User with id = ${id} deleted` }));
        }
        else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: `User with id = ${id} not found` }));
        }
    }
    catch(err){
        res.writeHead(500);
        res.end(JSON.stringify({ message: err.message }));
    }
}
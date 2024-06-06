const data = require('../../db.user');

module.exports = async (req,res) =>{
    let body = '';
    const id = parseInt(req.url.split('/')[2]);
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    try{
        req.on('end', async () =>{
            const UpdateBody = JSON.parse(body);
            const user = await data.updateUser(id,UpdateBody);
        
        if (user){
            res.writeHead(200);
            res.end(JSON.stringify(user));
        }
        else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: `User with id = ${id} not found` }));
        }
        });
    }
    catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
}
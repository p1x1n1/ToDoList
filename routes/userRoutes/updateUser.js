const data = require('../../data');

module.exports = (req,res) =>{
    let body = '';
    const id = parseInt(req.url.split('/')[2]);
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () =>{
        const UpdateBody = JSON.parse(body);
        const user = data.updateUser(id,UpdateBody);
    
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
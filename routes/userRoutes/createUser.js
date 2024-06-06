const data = require('../../db.user');

module.exports = async (req,res) =>{
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    try {
        req.on('end', async () =>{
            const parsedBody = new URLSearchParams(body);
            const name = parsedBody.get('name');
            const age = parsedBody.get('age');
            if (name && age){
                const user = { name, age: parseInt(age)};
                await data.createUser(user);
                const users = await data.getUsers();
                res.writeHead(200);
                res.end(JSON.stringify(users));
            }
            else {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'Name and Age not required' }));
            }
        });
    }
    catch(err){
        res.writeHead(500);
        res.end(JSON.stringify({ message: err.message }));
    }
    
    
}
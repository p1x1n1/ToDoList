const data = require('../../data');

module.exports = (req,res) =>{
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () =>{
        const parsedBody = new URLSearchParams(body);
        const name = parsedBody.get('name');
        const age = parsedBody.get('age');
        if (name && age){
            const user = { name, age: parseInt(age)};
            data.createUser(user);
            res.writeHead(200);
            res.end(JSON.stringify(data.getUsers()));
        }
        else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'Name and Age not required' }));
        }
    });
    
    
}
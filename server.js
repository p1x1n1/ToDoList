
const express = require('express');
const router = require('./routes/router.js');
const app = express();
const sequelize = require('./db.js');
const PORT = 5000;
app.use(express.json());
app.use('/api',router);

async function startApp(){
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT,()=>console.log(`Server start on Port: ${PORT}`));
    }catch(e){
        console.log(e);
    }
}

startApp();
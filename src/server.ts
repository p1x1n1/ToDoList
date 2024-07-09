
import dotenv from 'dotenv';
import express from 'express';
import router from './router';
import { PostgresDataSource } from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', router);

async function startApp() {
    try {
        await PostgresDataSource.initialize();
        app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

startApp();

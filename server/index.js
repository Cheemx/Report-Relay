import express from 'express';
import connectDB from "./db/index.js"
import dotenv from "dotenv"

dotenv.config({
    path: './env'
})

connectDB();

const app = express();

app.get('/api', (req, res) => {
    res.send('Server is Ready');
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}/api`);
})
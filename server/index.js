import express from 'express';

const app = express();

app.get('/api', (req, res) => {
    res.send('Server is Ready');
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}/api`);
})
import express from 'express';

const app = express();

app.get('/api', (req, res) => {
    res.send('Server is Ready');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
})
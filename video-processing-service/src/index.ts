import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Video Processing Service is running!');
});

app.listen(port, () => {
    console.log(`Video Processing Service is listening on port ${port}`);
});
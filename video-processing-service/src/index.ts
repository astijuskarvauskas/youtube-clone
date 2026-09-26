import express from 'express';
import ffmpeg from 'fluent-ffmpeg';

const app = express();
app.use(express.json());


app.post('/process-video', (req, res) => {
    const fileIn = req.body.fileIn;
    const fileOut = req.body.fileOut;

    if (!fileIn || !fileOut) {
        return res.status(400).send('Missing fileIn or fileOut parameter');
    }

    ffmpeg(fileIn)
        .outputOptions('-vf', 'scale=-1:360')
        .on('end', () => {
            console.log(`Video processing completed. Output file: ${fileOut}`);
            res.status(200).send(`Video processing completed. Output file: ${fileOut}`);
        })
        .on('error', (err) => {
            console.error("ERROR: ", err.message);
            res.status(500).send('Error processing video');
        })
        .save(fileOut);
});

const port = 3000;
app.get('/', (req, res) => {
    res.send('Video Processing Service is running!');
});

app.listen(port, () => {
    console.log(`Video Processing Service is listening on port ${port}`);
});
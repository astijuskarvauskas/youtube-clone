"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/process-video', (req, res) => {
    const fileIn = req.body.fileIn;
    const fileOut = req.body.fileOut;
    if (!fileIn || !fileOut) {
        return res.status(400).send('Missing fileIn or fileOut parameter');
    }
    (0, fluent_ffmpeg_1.default)(fileIn)
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

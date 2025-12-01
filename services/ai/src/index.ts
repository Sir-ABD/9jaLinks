import express from 'express';

const app = express();
const port = process.env.PORT || 3004;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('AI Service is running');
});

app.listen(port, () => {
    console.log(`AI service listening at http://localhost:${port}`);
});

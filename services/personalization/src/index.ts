import express from 'express';

const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Personalization Service is running');
});

app.listen(port, () => {
    console.log(`Personalization service listening at http://localhost:${port}`);
});

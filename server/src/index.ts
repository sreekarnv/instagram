import express from 'express';

const PORT = 4000;

const app = express();

app.get('/', (_, res) => {
    res.send('<h1>Hello World</h1>')
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})
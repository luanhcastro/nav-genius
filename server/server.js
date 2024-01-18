import express from 'express';
import pool from './db';
const port = 3000;

const app = express()

app.get('/', (req, res) => {
    res.sendStatus(200)
})


app.listen(port, () => console.log(`Server has started on port: ${port}`))
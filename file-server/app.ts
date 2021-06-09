import express from 'express';
import {port} from './app.config';

const app = express();

app.get('/', (req, res) => {
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
});

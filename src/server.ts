import "reflect-metadata";
import express = require("express");
import { router }  from './routes';
import './app/database';

const app = express();


app.use(express.json());
app.use(router);

app.listen(5000, () => {
    console.log("Server is running normally!")
})

import "reflect-metadata";
import express = require("express");
import { routes }  from './routes';
import './app/database';

const app = express();


app.use(express.json());
app.use(routes);

app.listen(5000, () => {
    console.log("Server is running normally!")
})

import express = require("express");
import routes from './routes';

const app = express();

app.use(express.static("public"))
app.use(routes);

app.listen(5000, () => {
    console.log("Server is running normally!")
})

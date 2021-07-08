import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { router }  from './routes';
import './app/database';

const app = express();

app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
   if (err instanceof Error) {
       return response.status(400).json({
           err: err.message
       });
   }

   return response.status(500).json({
       status: 'Error',
       err: 'Internal Server Error'
   });
   
});

app.listen(5000, () => {
    console.log("Server is running normally!")
})

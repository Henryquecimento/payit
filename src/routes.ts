import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  return res.send("Hey, it's working!");
});

export default routes;
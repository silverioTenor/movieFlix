import { Router } from 'express';

const personRouter = Router();

personRouter.get('/', async (request, response) => {
  return response.json({ message: 'Thats okay!' });
});

export default personRouter;

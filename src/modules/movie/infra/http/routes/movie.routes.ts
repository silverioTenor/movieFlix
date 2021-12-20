import { Router } from 'express';

import CreateMovieController from '../controllers/CreateMovie.controller';
import GetMovieController from '../controllers/GetMovie.controller';
import RemoveMovieController from '../controllers/RemoveMovie.controller';
import UpdateMovieController from '../controllers/UpdateMovie.controller';

const movieRouter = Router();

movieRouter.get('/', GetMovieController.handle);

movieRouter.post('/', CreateMovieController.handle);

movieRouter.put('/:id', UpdateMovieController.handle);

movieRouter.delete('/:id', RemoveMovieController.handle);

export default movieRouter;

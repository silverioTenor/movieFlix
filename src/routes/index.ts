import { Router } from 'express';

import categoryRoutes from './category.routes';
import movieRoutes from './movie.routes';

const routes = Router();

routes.use('/categories', categoryRoutes);
routes.use('/movies', movieRoutes);

export default routes;

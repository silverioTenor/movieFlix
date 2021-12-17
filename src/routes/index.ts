import { Router } from 'express';

import categoryRoutes from './category.routes';
import movieRoutes from './movie.routes';
import personRoutes from './person.routes';

const routes = Router();

routes.use('/categories', categoryRoutes);
routes.use('/movies', movieRoutes);
routes.use('/persons', personRoutes);

export default routes;

import { Router } from 'express';

import categoryRoutes from '@modules/category/infra/http/routes/category.routes';
import movieRoutes from '@modules/movie/infra/http/routes/movie.routes';
import personRoutes from '@modules/person/infra/http/routes/person.routes';

const routes = Router();

routes.use('/categories', categoryRoutes);
routes.use('/movies', movieRoutes);
routes.use('/persons', personRoutes);

export default routes;

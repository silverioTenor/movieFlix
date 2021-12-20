import { Router } from 'express';

import CreateCategoryController from '../controllers/CreateCategory.controller';
import GetCategoryController from '../controllers/GetCategory.controller';
import RemoveCategoryController from '../controllers/RemoveCategory.controller';
import UpdateCategoryController from '../controllers/UpdateCategory.controller';

const categoryRouter = Router();

categoryRouter.get('/', GetCategoryController.handle);

categoryRouter.post('/', CreateCategoryController.handle);

categoryRouter.put('/:id', UpdateCategoryController.handle);

categoryRouter.delete('/:id', RemoveCategoryController.handle);

export default categoryRouter;

import { Router } from 'express';

import CreatePersonController from '../controllers/CreatePerson.controller';
import GetPersonController from '../controllers/GetPerson.controller';
import RemovePersonController from '../controllers/RemovePerson.controller';
import UpdatePersonController from '../controllers/UpdatePerson.controller';

const personRouter = Router();

personRouter.get('/', GetPersonController.handle);

personRouter.post('/', CreatePersonController.handle);

personRouter.put('/:id', UpdatePersonController.handle);

personRouter.delete('/:id', RemovePersonController.handle);

export default personRouter;

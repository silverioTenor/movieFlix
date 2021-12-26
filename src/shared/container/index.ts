import { container } from 'tsyringe';

import PersonRepository from '@modules/person/infra/typeorm/repositories/PersonRepository';
import IPersonRepository from '@modules/person/repositories/IPersonRepository';

container.registerSingleton<IPersonRepository>('PersonRepository', PersonRepository);

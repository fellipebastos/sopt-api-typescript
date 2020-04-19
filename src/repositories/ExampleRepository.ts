import { EntityRepository, Repository } from 'typeorm';

import ExampleModel from '../models/ExampleModel';

@EntityRepository(ExampleModel)
class ExampleRepository extends Repository<ExampleModel> {}

export default ExampleRepository;

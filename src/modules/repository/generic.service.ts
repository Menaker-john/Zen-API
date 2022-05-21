import { User } from 'src/schema/user.schema';
import { GenericRepository } from './repositories/generic.repository';

export abstract class GenericRepositoryService {
  abstract users: GenericRepository<User>;
}

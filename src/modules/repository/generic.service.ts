import { Credentials, User, Profile } from 'src/schema';
import { GenericRepository } from './repositories/generic.repository';

export abstract class GenericRepositoryService {
  abstract users: GenericRepository<User>;
  abstract credentials: GenericRepository<Credentials>;
  abstract profiles: GenericRepository<Profile>;
}

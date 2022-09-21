import { DataSource } from 'typeorm';
import { Job } from './job.entity';

export const JobsProviders = [
  {
    provide: 'JOBS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Job),
    inject: ['DATA_SOURCE'],
  },
];
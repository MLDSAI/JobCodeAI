import { Job } from '@entities/job';
import { dataSource } from '@libs/datasource.config'
import { DataSource, Repository } from 'typeorm'

export class JobService {
    private readonly repository: Repository<Job>;

    constructor(private readonly datasource: DataSource) {
        if (!this.datasource) {
            this.datasource = new DataSource(dataSource);
        }
        this.repository = this.datasource.getRepository(Job);
    }

    async AddJob(job: Job) {
        const exists = await this.repository.exist({ where: {
            jobCode: job.jobCode
        }});
        if (!exists) {
            return this.repository.save(job);
        }
    }

    async GetAllJobs() {
        return this.repository.find({});
    }

    async getJobById(id: number): Promise<Job> {
        return this.repository.findOne({
            where: {id: id}
        });
    }
}
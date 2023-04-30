import { dataSource } from '@libs/datasource.config';
import { JobService } from '@services/job.service';
import { MarriottService } from '@services/marriott.service';
import { ParseJobPageService } from '@services/parseJobPage.service';
import { Context, SQSEvent } from 'aws-lambda';
import { DataSource } from 'typeorm';

export const handler = async (event: SQSEvent, context: Context): Promise<void> => {
    await Promise.all(event.Records.map(async (record) => {
        const link = record.body;
        const marriotService = new MarriottService();
        const parseJobService = new ParseJobPageService();
        const ds: DataSource = new DataSource(dataSource);
        await ds.initialize();
        const jobService = new JobService(ds)

        const content = await marriotService.getJobPage(link);
        const job = await parseJobService.getJobFromContent(content);

        const newJob = await jobService.AddJob(job);

        console.log(newJob);
    }));
}
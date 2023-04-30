import { JobService } from '@services/job.service';
import { MarriottService } from '@services/marriott.service';
import { ParseJobPageService } from '@services/parseJobPage.service';
import { DataSource } from "typeorm";
import { dataSource } from "@libs/datasource.config";

const pageString = process.argv[process.argv.length - 1];
const page = Number.parseInt(pageString);
console.log("page number to process: ", page);

const parseService = new MarriottService();
const blahService = new ParseJobPageService();
const ds: DataSource = new DataSource(dataSource);
let jobService: JobService;
console.log(ds);
ds.initialize().then(c => console.log("datasource initialized!", c.hasMetadata));
parseService.getCareersPage(page).then(async (p) => {
    console.log(p);
    if (!jobService) {
        jobService = new JobService(ds);
    }

    await Promise.all(p.map(async(link) => {
        const content = await parseService.getJobPage(link);
        const job = await blahService.getJobFromContent(content);
        const newJob = await jobService.AddJob(job);
        console.log("id: ", newJob?.id);
    }));
});
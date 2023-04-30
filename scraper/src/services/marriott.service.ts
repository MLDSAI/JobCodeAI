import { launch } from 'puppeteer';
 
export class MarriottService {
    private readonly careersUrl = "https://jobs.marriott.com/marriott/jobs?page=";
    async getJobPage(jobPagesUrl: string): Promise<string | null> {
        const browser = await launch();
        const page = await browser.newPage();
        const url = jobPagesUrl;

        console.log(url);

        await page.goto(url, { waitUntil : "networkidle0", timeout: 0 });

        const content = await page.content();

        await browser.close();

        return content;
    }

    async getCareersPage(pageNumber: number): Promise<Array<string>> {
        const browser = await launch();
        const page = await browser.newPage();

        await page.goto(`${this.careersUrl}${pageNumber}`, { waitUntil : "networkidle0", timeout: 0 });

        const links = await page.evaluate(() => Array.from(document.querySelectorAll("a"),(e) => e.href ));

        const dedupLinks = new Set(links.filter(link => link.startsWith("https://jobs.marriott.com/marriott/jobs/")));

        await browser.close();

        return Array.from(dedupLinks);
    }
}
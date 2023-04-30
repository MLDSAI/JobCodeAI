import { JSDOM } from 'jsdom-lambda';
import { Job } from '@entities/job';

export class ParseJobPageService {
    constructor() {
    }
    
    async getJobFromContent(content: string) {
        if (content) {
            const { document } = new JSDOM(content).window;
            const item = document.querySelectorAll('b');
        
            const article = document.getElementById('description-body');
            const job = new Job();
        
            item.forEach(i => {
                const value = this.parseHtml(article.innerHTML, i.innerHTML);
                switch (i.innerHTML) {
                    case "Job Number": 
                        job.jobCode = Number.parseInt(value);
                        break;
                    case "Job Category": 
                        job.jobCategory = value;
                        break;
                    case "Location": 
                        job.location = value.substring(0, value.indexOf("<a"));
                        break;
                    case "Schedule": 
                        job.schedule = value;
                        break
                    case "Located Remotely?": 
                        job.remote = value;
                        break
                    case "Relocation?": 
                        job.relocation = value;
                        break
                    case "Position Type": 
                        job.positionType = value;
                        break
                }
            });
        
            const paragraphs = document.querySelectorAll('p');
            let i=0;
            paragraphs.forEach(p => {
                if (p.innerHTML.length > 20 && ! p.innerHTML.includes("POSITION SUMMARY") && ! p.innerHTML.includes("JOB SUMMARY") && ! p.innerHTML.startsWith("Check out pictures from associates")) {
                    if (i===0) {
                        job.positionSummary = p.innerHTML;
                    } else if (i===1) {
                        job.positionSummary = job.positionSummary + "\r\n" + p.innerHTML;
                    }
                    i++;
                }
            });

            return job;
            // const jobContent = content.substring(start, end).replaceAll("<b>", "").replaceAll("</b>", "").split("<br>");

            // jobContent.forEach(j => {
            //     let jobNumber = 0;
            //     if (j.includes("Job Number")) {
            //         const jn = j.substring(j.indexOf("Job Number ")).replace("Job Number ", "");
            //         if (Number.parseInt(jn)) {
            //             jobNumber = Number.parseInt(jn);
            //         }
            //     }
                
            //     let jobCategory = "";
            //     if (j.includes("Job Category")) {
            //         jobCategory = j.replace("Job Category ", "");
                    
            //     }
                
            //     let location = "";
            //     if (j.includes("Schedule")) {
            //         location = j.replace("Schedule ", "");
                    
            //     }
                
            //     let schedule = "";
            //     if (j.includes("Schedule")) {
            //         schedule = j.replace("Schedule ", "");
                    
            //     }
                
            //     let remote = "";
            //     if (j.includes("Located Remotely?")) {
            //         remote = j.replace("Located Remotely? ", "");
                    
            //     }
                
            //     let relocation = "";
            //     if (j.includes("Relocation?")) {
            //         relocation = j.replace("Relocation? ", "");
                    
            //     }
                
            //     let positionType = "";
            //     if (j.includes("Position Type")) {
            //         positionType = j.replace("Position Type ", "");
                    
            //     }

            //     let summary = "";
            //     if (j.includes("POSITION SUMMARY")) {

            //     }
            // })
        }
    }

    private parseHtml(html: string, propertyToFind: string) : string {
        const start = html.indexOf(propertyToFind) + propertyToFind.length + 5;
        const end = html.indexOf("<br>", start);
        return html.substring(start, end);
    }
}
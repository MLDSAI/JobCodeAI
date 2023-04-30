import { SQS } from 'aws-sdk'

export class SQSService {
    private readonly eventSqs;

    constructor(){
        this.eventSqs = new SQS({ region: 'us-west-2'});
    }

    async SendLinksToSQS(links: string[]) {
        await Promise.all(links.map(async (link) => {
            await this.eventSqs.sendMessage({
                MessageAttributes: {
                    Type: {
                        DataType: 'String',
                        StringValue: 'link-processing'
                    }
                },
                MessageBody: link,
                QueueUrl: "https://sqs.us-west-2.amazonaws.com/835170592220/hackathon-scraper-queue"
            }).promise();
        }));
    }
}
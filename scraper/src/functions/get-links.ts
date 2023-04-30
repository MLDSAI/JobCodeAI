import { formatJSONResponse } from '@libs/header';
import { ParseJobPageService } from '@services/parseJobPage.service';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { SQS } from 'aws-sdk'
import { randomUUID } from "crypto";

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const eventSqs = new SQS({ region: 'us-west-2'});

    const page = event.pathParameters.page;
    const pageNumber = Number.parseInt(page);

    if (pageNumber) {
        const marriotService = new ParseJobPageService();

        const links = await marriotService.getCareersPage(pageNumber);

        await Promise.all(links.map(async (link) => {
            await eventSqs.sendMessage({
                MessageAttributes: {
                    Type: {
                        DataType: 'String',
                        StringValue: 'link-processing'
                    }
                },
                MessageBody: link,
                MessageDeduplicationId: randomUUID(),
                QueueUrl: "https://sqs.us-west-2.amazonaws.com/835170592220/hackathon-scraper-queue"
            }).promise();
        }));

        
      return formatJSONResponse({
        links: links
      });
    }

}
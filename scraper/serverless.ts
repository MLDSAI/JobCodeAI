import type { AWS } from '@serverless/typescript';

const host = process.env.MYSQL_SERVER;
const port = process.env.MYSQL_PORT;
const username = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PWD;
const database = process.env.MYSQL_SCHEMA;

const serverlessConfiguration: AWS = {
  service: 'hackathon-scraper',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "sqs:SendMessage",
          "sqs:ReceiveMessage",
          "dynamodb:PutItem",
          "dynamodb:GetItem",
        ],
        Resource: [`*`]
      }
    ]
  },
  resources: {
    Resources: {
      HackathonQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
            QueueName: "hackathon-scraper-queue",
        }
      }
    }
  },
  // import the function via paths
  functions: { 
    createJob: {
      handler: './src/functions/process-link.handler',
      timeout: 30,
      memorySize: 3000,
      environment: {
        MYSQL_SERVER: host,
        MYSQL_PORT: port,
        MYSQL_USERNAME: username,
        MYSQL_PWD: password,
        MYSQL_SCHEMA: database
      },
      events: [
        {
          sqs: {
            arn: "arn:aws:sqs:us-west-2:835170592220:hackathon-scraper-queue"
            }
        },
      ]
    },
   },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;


# Mocha and Chai Test Documentation with PostgreSQL and TypeScript

This guide will walk you through setting up and using Mocha and Chai for testing a TypeScript project with a PostgreSQL database, and measuring test coverage using NYC.

## Table of Contents

* [Prerequisites](#prerequisites)

* [Setup](#setup)

  - [Installing Dependencies](#installing-dependencies)

  - [Creating Folder Structure](#creating-folder-structure)
* [Writing Tests](#writing-tests)

  - [Testing Services with External Resources](#testing-services-with-external-resources)

* [Running Tests](#running-tests)
* [Test Coverage](#test-coverage)

  - [Coverage Config](#coverage-config)

  - [SonarQube Integration](#sonarqube-integration)
* [Appendix](#appendix)
  - [Run Selected Tests](#run-selected-tests)

## Prerequisites

* Node.js installed on your machine.
* PostgreSQL installed and running.
* Basic understanding of TypeScript.
* Familiarity with Mocha, Chai, and NYC.

## Setup

### Installing Dependencies

The following packages will be used;

* [Mocha](https://www.npmjs.com/package/mocha)

* [Chai](https://www.npmjs.com/package/chai)

* [Nyc](https://www.npmjs.com/package/nyc)

```bash
npm install mocha@10.2.0 chai@4.3.10 nyc
npm install --save-dev mocha chai @types/chai @types/mocha
```

### Creating Folder Structure

```txt
.
├── src
│   ├── db
│   │   └── index.ts
│   └── app.ts
|       
|__ test
│   └── app.test.ts
├── .nycrc
└── package.json

```

### Database setup

First, ensure you have PostgreSQL installed on your system. You can download and install PostgreSQL from the official website or use a package manager, make sure the PostgreSQL service is running.

Next, you'll need to create a new PostgreSQL database for your application. You can do this through a GUI like pgAdmin.

Once your database is created, you'll need to configure the connection details in the connect.test.ts file. This file likely resides within your project's test directory and contains TypeScript code for setting up a connection to the database.

The TestDbConnection object is of type PostgresConnectionOptions, which specifies various properties for establishing a connection to a PostgreSQL database.

```javascript
const TestDbConnection: PostgresConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.TEST_DB_HOST,
  port: Number(process.env.TEST_DB_PORT),
  username: process.env.TEST_DB_USERNAME,
  password: process.env.TEST_DB_PASSWORD,
  database: process.env.TEST_DB_NAME,
  synchronize: true,
  logging: false,
};
```

## Writing Tests

Each test should follow the required convention for writing unit tests i.e. <b>Arrange, Act and Assert</b>

```javascript

describe('communityHeadService', () => {
  let communityHeadService: CommunityHeadService;

  before(() => {
    communityHeadService = new CommunityHeadService();
  });

  describe('syncDown', () => {
    // Successfully download community head data
    it('should successfully download community head data', async () => {

      //Arrange
      const lastSyncTime = '0';
      const hubId = '12345';
      //Act
      const downloadables = await communityHeadService.downloadCommunityHead(lastSyncTime, hubId);
      //Assert
      expect(downloadables).to.be.an('array');
    });
  });
});

```

__*Arrange*__: This section is where you set up the preconditions for the test. In this case, you're defining variables lastSyncTime and hubId to use as input parameters for the downloadCommunityHead method.

__*Acct*__: Here, you invoke the method or functionality that you're testing. In this case, it's calling the downloadCommunityHead method of the communityHeadService object with the provided parameters.

__*Assert*__: This is where you verify that the actual behavior of the code matches the expected behavior. Here, you're asserting that the downloadables variable returned by the downloadCommunityHead method is an array. If the assertion fails, it indicates that there's an unexpected result or behavior in the code being tested.

## Testing Services with External Resources

The behavior of external resources such as APIs are usually outside your control while writing unit tests. Using an injectable can help mock and manage the behavior of these external resources.

Example Unit Test with an injectable service,

```javascript

// Mock Class
class PlanningTestService extends PlanningService {
  constructor() {
    super();
  }

  async getUserFromPlanning(staff_id: string): Promise<any> {
    // return mock data
  }
}

describe('memberPoolService', () => {
  let planningService: PlanningTestService;
  let memberPoolService: MemberPoolService;

  before(() => {
    planningService = new PlanningTestService();
    memberPoolService = new MemberPoolService(planningService);
  });

  describe('syncDownMemberPool', () => {
    // Implement unit tests
  });
});
```

__*Mock Class*__: We create a PlanningTestService class that extends PlanningService and overrides the getUserFromPlanning method to return mock data. This allows us to control the behavior of the external service during testing.

__*Injectable Service*__: We create an instance of PlanningTestService and inject it into the MemberPoolService constructor. This allows us to replace the real external service (PlanningService) with our mock service (PlanningTestService) during testing.

__*Unit Tests*__: We write unit tests for the syncDownMemberPool method of MemberPoolService. In these tests, we use sinon to stub the getUserFromPlanning method of the mock service and control its behavior. We then test different scenarios, such as successful synchronization and error handling, by arranging the test data, acting on the method under test, and asserting the expected outcomes.

## Running Tests

```bash
"test": "mocha  --timeout 30000 -r ts-node/register 'test/**/*.ts'",
```

In this script:

**`--timeout 30000`**: This option sets the timeout for each test case to 30,000 milliseconds (30 seconds). This is necessary to handle issues such as delayed database connections. If a test case takes longer than 30 seconds to complete, Mocha will abort the test and mark it as failed.

**`"-r ts-node/register"`**: This option tells Mocha to use ts-node/register to compile and execute TypeScript files on the fly. This allows you to run TypeScript tests directly without pre-compiling them to JavaScript.

**`"'test/**/*.ts'"`**: This is the file glob pattern that specifies the location of the test files. In this case, it tells Mocha to look for TypeScript files under the src/test directory and its subdirectories.

## Test Coverage

Test coverage gives you report of the percentage of the project that has been covered by the written tests.

```json
"coverage": "nyc --reporter=lcov --reporter=text-summary npm run test",
```

**`--reporter=lcov`**: This option specifies that the coverage report should be generated in the LCOV format, which is a common format for code coverage reports.

**`--reporter=text-summary`**: This option specifies that a text summary of the coverage report should be printed to the console after the tests have finished running.

### Coverage Config

setup the nyc package config with .nycrc file. This is used to reset the default values as well as the  the coverage output formats

```json
{
  "all": true,
  "reporter": ["lcov", "text", "text-summary"],
  "report-dir": "coverage",
  "check-coverage": true
}
```

**`"all": true`**: This setting ensures that coverage data will be collected for all files in your project, including those that aren't required by any tests.
"reporter": ["lcov", "text", "text-summary"]: This specifies the formats of the coverage reports that nyc will generate. It includes the LCOV format, a text report, and a text summary report.

**`"report-dir": "coverage"`**: This setting determines the directory where the coverage reports will be saved. In this case, they will be saved in a directory named "coverage" in the root of your project.

**`"check-coverage": true`**: This setting instructs nyc to check the coverage thresholds specified in your configuration (if any) and fail the process if the coverage falls below those thresholds.

### SonarQube Integration

Code coverage report can be view directly on sonarqube. Use the documents below as a guide to integrate your project with sonarqube
* [Overview](https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/test-coverage/javascript-typescript-test-coverage/)
* [TypeScript/Javascript Integration Guide](https://docs.sonarsource.com/sonarqube/latest/analyzing-source-code/test-coverage/javascript-typescript-test-coverage/)

## Appendix 

### Run Selected Tests

since Mocha is installed, you can use the npx command to execute Mocha with the desired test files.

Execute Mocha with npx: Run the following command, replacing path/to/selected/file.js with the actual path to your test file or a pattern that matches multiple files:

```bash
    npx mocha --timeout 3000  --require ts-node/register  path/to/selected/file.js
```

In our case, since we need the database to be connected while running these tests, you need to run the test file for database connection and the actual file you want to test. See the example below:

```bash 
    npx mocha --timeout 3000  --require ts-node/register test/01-connection.test.ts test/member-pool.test.ts
```
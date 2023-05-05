# Project Title

Knack - Take home exercise

## Features

- Deduplication of objects and fields from the app schema
- The solution contains both javascript an typescript solutions.
- Javascript solution is in src/js/index.js, src/js/util.js and tests/index.test.js
- Typescript solution is in src/util.ts, src/app.ts and tests/app.test.ts

## Prerequisites

- Node.js
- npm
- TypeScript
- Jest

## Installation

1. Install Node.js and npm if not already installed.
2. Install TypeScript globally with `npm install -g typescript`.
3. Install Jest globally (sometimes there are issues with project installations) with `npm install -g jest`.
4. Unzip the archive and navigate to the project root directory.
5. Install project dependencies with `npm install`.

## Running the Application

### JavaScript implementation

From the project root directory, execute the following command:

```bash
node src/js/index.js src/mock_application.json
```
Second command line parameter is the name of the file that has to be sanitized.

### TypeScript implementation

First, compile the TypeScript files:

```bash
cd src
tsc util.ts
tsc app.ts
cd ..
```

Then, from the project root directory, execute the following command:

```bash
node src/app.js src/mock_application.json
```

## Running Tests

From the project root directory, execute the following command to run the tests:

```bash
jest
```

## Remarks
The solution is delivered with precompiled typescript

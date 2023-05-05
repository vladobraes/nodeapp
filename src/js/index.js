const fs = require('fs');
const { removeDuplicates, writeCleanApplication } = require('./util'); 
  

// Read the file name from the command line
var inputFileName = process.argv[2];
if (!inputFileName) {
    console.error("Error: Please provide input and output file names.");
    process.exit(1);
}

// Read the mock application
let mockApp = fs.readFileSync(inputFileName);

// Parse the mock application
let mockAppJSON = JSON.parse(mockApp);

// Remove the duplicate fields and objects
let cleanAppJSON = removeDuplicates(mockAppJSON);

writeCleanApplication(cleanAppJSON);

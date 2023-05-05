"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var util_1 = require("./util");
// Read the file name from the command line
var inputFileName = process.argv[2];
if (!inputFileName) {
    console.error("Error: Please provide input and output file names.");
    process.exit(1);
}
// Read the mock application
var mockApp = fs.readFileSync(inputFileName, 'utf-8');
// Parse the mock application
var mockAppJSON = JSON.parse(mockApp);
// Remove the duplicate fields and objects
var cleanAppJSON = (0, util_1.removeDuplicates)(mockAppJSON);
(0, util_1.writeCleanApplication)(cleanAppJSON);

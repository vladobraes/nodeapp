import * as fs from 'fs';
import { removeDuplicates, writeCleanApplication, Schema } from './util'; 
  

// Read the file name from the command line
const inputFileName: string = process.argv[2];
if (!inputFileName) {
    console.error("Error: Please provide input and output file names.");
    process.exit(1);
}

// Read the mock application
const mockApp: string = fs.readFileSync(inputFileName, 'utf-8');

// Parse the mock application
const mockAppJSON: Schema = JSON.parse(mockApp);

// Remove the duplicate fields and objects
const cleanAppJSON: Schema = removeDuplicates(mockAppJSON);

writeCleanApplication(cleanAppJSON);
import * as fs from 'fs';
import * as assert from 'assert';
import { removeDuplicates, writeCleanApplication } from '../src/util'; // Update the import

describe('removeDuplicates', () => {
  it('should remove duplicate objects and fields from the schema', () => {
    // Read the mock application
    const mockApp = fs.readFileSync('./src/mock_application.json', 'utf-8');

    // Parse the mock application
    const mockAppJSON = JSON.parse(mockApp);

    // Remove the duplicate fields and objects
    const cleanAppJSON = removeDuplicates(mockAppJSON);

    // Check if the duplicates are removed
    const uniqueObjects = new Set();
    const uniqueFields = new Set();

    cleanAppJSON.versions.forEach((version: any) => {
      version.objects.forEach((object: any) => {
        assert(!uniqueObjects.has(object.key), 'Duplicate object found');
        uniqueObjects.add(object.key);

        object.fields.forEach((field: any) => {
          assert(!uniqueFields.has(field.key), 'Duplicate field found');
          uniqueFields.add(field.key);
        });
      });
    });
  });
});

describe('writeCleanApplication', () => {
  it('should write the clean application to a file without errors', async () => {
    // Read the mock application
    const mockApp = fs.readFileSync('./src/mock_application.json', 'utf-8');
    console.log(mockApp);
    // Parse the mock application
    const mockAppJSON = JSON.parse(mockApp);

    // Remove the duplicate fields and objects
    const cleanAppJSON = removeDuplicates(mockAppJSON);

    // Write the clean application to a file and check for errors
    try {
      await writeCleanApplication(cleanAppJSON);
    } catch (err) {
      assert.fail('Error writing clean application to file: ' + err);
    }

    // Check if the file exists and contents are correct
    try {
      const cleanAppFile = fs.readFileSync('clean_application.json', 'utf-8');
      const cleanAppFileJSON = JSON.parse(cleanAppFile);
      assert.deepStrictEqual(cleanAppJSON, cleanAppFileJSON, 'File contents do not match expected clean application');
    } catch (err) {
      assert.fail('Error reading clean application file: ' + err);
    }
  });
});
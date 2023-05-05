const fs = require('fs');
const assert = require('assert');
const { removeDuplicates, writeCleanApplication } = require('../src/js/util'); // Update the import


describe('removeDuplicates', () => {
  it('should remove duplicate objects and fields from the schema', () => {
    // Read the mock application
    let mockApp = fs.readFileSync('./src/mock_application.json');

    // Parse the mock application
    let mockAppJSON = JSON.parse(mockApp);

    // Remove the duplicate fields and objects
    let cleanAppJSON = removeDuplicates(mockAppJSON);

    // Check if the duplicates are removed
    let uniqueObjects = new Set();
    let uniqueFields = new Set();

    cleanAppJSON.versions.forEach(version => {
      version.objects.forEach(object => {
        assert(!uniqueObjects.has(object.key), 'Duplicate object found');
        uniqueObjects.add(object.key);

        object.fields.forEach(field => {
          assert(!uniqueFields.has(field.key), 'Duplicate field found');
          uniqueFields.add(field.key);
        });
      });
    });
  });
});

describe('writeCleanApplication', () => {
  it('should write theclean application to a file without errors', async () => {
    // Read the mock application
    let mockApp = fs.readFileSync('./src/mock_application.json');
    console.log(mockApp);
    // Parse the mock application
    let mockAppJSON = JSON.parse(mockApp);

    // Remove the duplicate fields and objects
    let cleanAppJSON = removeDuplicates(mockAppJSON);

    // Write the clean application to a file and check for errors
    try {
      await writeCleanApplication(cleanAppJSON);
    } catch (err) {
      assert.fail('Error writing clean application to file: ' + err);
    }

    // Check if the file exists and contents are correct
    try {
      let cleanAppFile = fs.readFileSync('clean_application.json');
      let cleanAppFileJSON = JSON.parse(cleanAppFile);
      assert.deepStrictEqual(cleanAppJSON, cleanAppFileJSON, 'File contents do not match expected clean application');
    } catch (err) {
      assert.fail('Error reading clean application file: ' + err);
    }
  });
});
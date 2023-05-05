const fs = require('fs');

// Function to remove duplicate fields and objects from application schema
const removeDuplicates = (schema) => {
    let cleanSchema = schema;
    let uniqueObjects = [];
    let uniqueFields = [];

    // Iterate over the versions array
    cleanSchema.versions.forEach(version => {
        // Iterate over the objects array
        version.objects.forEach(object => {
            // Check if object already exists
            if(!uniqueObjects.includes(object.key)) {
                // If not, add it to the array and keep it
                uniqueObjects.push(object.key);
            } else {
                // If it does, remove it from the array
                version.objects.splice(version.objects.indexOf(object), 1);
            }

            // Iterate over the fields array
            object.fields.forEach(field => {
                // Check if field already exists
                if(!uniqueFields.includes(field.key)) {
                    // If not, add it to the array and keep it
                    uniqueFields.push(field.key);
                } else {
                    // If it does, remove it from the array
                    object.fields.splice(object.fields.indexOf(field), 1);
                }
            });
        });
    });

    return cleanSchema;
};

const writeCleanApplication = (cleanAppJSON) => {
    return new Promise((resolve, reject) => {
      fs.writeFile('clean_application.json', JSON.stringify(cleanAppJSON), (err) => {
        if (err) reject(err);
        console.log('File successfully written!');
        resolve();
      });
    });
  };
  



module.exports = { removeDuplicates, writeCleanApplication };
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeCleanApplication = exports.removeDuplicates = void 0;
var fs = require("fs");
// Function to remove duplicate fields and objects from application schema
var removeDuplicates = function (schema) {
    var cleanSchema = schema;
    var uniqueObjects = [];
    var uniqueFields = [];
    // Iterate over the versions array
    cleanSchema.versions.forEach(function (version) {
        // Iterate over the objects array
        version.objects.forEach(function (object) {
            // Check if object already exists
            if (!uniqueObjects.includes(object.key)) {
                // If not, add it to the array and keep it
                uniqueObjects.push(object.key);
            }
            else {
                // If it does, remove it from the array
                version.objects.splice(version.objects.indexOf(object), 1);
            }
            // Iterate over the fields array
            object.fields.forEach(function (field) {
                // Check if field already exists
                if (!uniqueFields.includes(field.key)) {
                    // If not, add it to the array and keep it
                    uniqueFields.push(field.key);
                }
                else {
                    // If it does, remove it from the array
                    object.fields.splice(object.fields.indexOf(field), 1);
                }
            });
        });
    });
    return cleanSchema;
};
exports.removeDuplicates = removeDuplicates;
var writeCleanApplication = function (cleanAppJSON) {
    return new Promise(function (resolve, reject) {
        fs.writeFile('clean_application.json', JSON.stringify(cleanAppJSON), function (err) {
            if (err)
                reject(err);
            console.log('File successfully written!');
            resolve();
        });
    });
};
exports.writeCleanApplication = writeCleanApplication;

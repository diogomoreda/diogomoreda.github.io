const fs = require('fs');
const path = require('path');

function parseTitle(inputString) {
    const fileNumberStr = '' + (inputString.match(/\d+/) || [])[0];
    // 1. Remove all numbers
    const stringWithoutNumbers = inputString.replace(/\d+\./g, '');
    // 2. Remove the file extension (assuming it's the portion after the last dot)
    const withoutFileExtension = stringWithoutNumbers.replace(/\.[^.]+$/, '');
    // 3. Convert from camel case to regular text
    const camelToText = withoutFileExtension.replace(/\-/g, ' ').replace(/([A-Z])/g, ' $1').trim();
    // 4.trim
    const trimmed = camelToText.replace(/\s+/g, ' ').trim();
    return `${trimmed} ${parseInt(fileNumberStr, 10)}`;
}

function getContentJson(folderPath, newPath) {
    // Read the files in the folder
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading folder:', err);
            return;
        }
        if (!newPath) newPath = folderPath;
        // Specify the file path and name
        const filePath = `${folderPath}/content.json`;
        let content = [];
        files.forEach((file, index) => {
            let ext = path.extname(file).toLowerCase();
            if (ext !== 'png' || ext !== 'jpg') { 
                var indexStr = '' + index;
                while (indexStr.length < 4) indexStr = '0' + indexStr;
                content.push({
                    id: indexStr,
                    path: `${newPath}/${file}`,
                    name: parseTitle(file)
                });
            }
        });
        const jsonString = JSON.stringify(content, null, 4);
        //return console.log(jsonString);
        fs.writeFile(filePath, jsonString, (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
            } else {
                console.log(`JSON file "${filePath}" has been created successfully.`);
            }
        });
    });
}

const folderPath = './../../public/images/projects';
const outputPath = './images/projects';

getContentJson(folderPath, outputPath);
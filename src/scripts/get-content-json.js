const fs = require('fs');
const path = require('path');
const config = require('../configuration/get-content-json.config.json');


function parseId(index) 
{
    let indexStr = '' + index;
    while (indexStr.length < config.idIndentation) indexStr = '0' + indexStr;
    return indexStr;
}


function parseFileExtension(filename) 
{
    const regex = /\.([0-9a-z]+)$/i;
    const match = regex.exec(filename);
    return match ? match[1].toLowerCase() : null;
}


function parseTitle(inputString) 
{
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


async function generateFolderContentJsonFiles(folderPath, type='image') // folderPath: './../../public/images' '/{contentFolderName}' '/file'
{    
    const folderContent = fs.readdirSync(folderPath);
    if (!folderContent.length) {
        console.log(`The folder ${folderPath} is empty.`);
        return;
    }
    folderContent.forEach((contentFolderName) => {
        const itemPath = path.join(folderPath, contentFolderName);
        if (!fs.statSync(itemPath).isDirectory()) return;

        // read the contents of the folder: {folderPath}/{type}/{contentFolderName} 
        const contentFolderItems = fs.readdirSync(itemPath);
        // filter the contents by file type
        const contentFolderFiles = contentFolderItems.filter((item) => (config.fileExtensions[type].includes(parseFileExtension(item))));
        // if no files are found, resume
        if (!contentFolderFiles.length) return;
        // extract the file details
        const contentFolderFileDetails = contentFolderFiles
            .map((item) => {
                const filePath = path.join(folderPath, contentFolderName, item);
                const stats = fs.statSync(filePath);
                return {
                    file: item,
                    path: filePath,
                    modified: stats.mtime
                }
            });
        // sort items accordingly
        let sortedItems = contentFolderFileDetails;
        if (config.sortItemsBy === 'name') {
            sortedItems = config.sortingOrder === 'ascending' ? 
                contentFolderFileDetails.sort((a, b) => a.file - b.file) : 
                contentFolderFileDetails.sort((a, b) => b.file - a.file);
        } 
        else if (config.sortItemsBy === 'date') {
            sortedItems = config.sortingOrder === 'ascending' ? 
                contentFolderFileDetails.sort((a, b) => a.modified - b.modified) : 
                contentFolderFileDetails.sort((a, b) => b.modified - a.modified);
        }
        // generate output data model
        let outputModel = [];
        sortedItems.forEach((item, index) => {
            outputModel.push({
                id: parseId(index),
                path: `./${config.inputFolderNames[type]}/${contentFolderName}/${item.file}`,
                name: parseTitle(item.file)
            })
        });
        // write the json file
        const outputFilePath = `./${itemPath}/${config.outputFileName}`
        try {
            const jsonString = JSON.stringify(outputModel, null, 4);
            fs.writeFileSync(outputFilePath, jsonString, 'utf8');
            console.log(`JSON file "${outputFilePath}" has been created successfully.`);
        } 
        catch(e) {
            console.error('Error writing JSON file:', e);
        }
    });
}


async function run(contentType=null) 
{
    const types = Object.keys(config.inputFolderNames);
    if (!types.includes(contentType)) {
        for (let i=0; i<types.length; i++) {
            const folderPath = path.join(config.publicContentFolderPath, config.inputFolderNames[types[i]]);
            generateFolderContentJsonFiles(folderPath, types[i]);
        }
    } else {
        const folderPath = path.join(config.publicContentFolderPath, config.inputFolderNames[contentType]);
        generateFolderContentJsonFiles(folderPath, contentType)
    }
}


run();
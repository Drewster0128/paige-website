import { google } from "googleapis"
import { promises } from "fs"

const AUTH = new google.auth.GoogleAuth({
    keyFile: process.env.KEYFILE,
    scopes: [process.env.SCOPES]
});

// fetch meta-data from google drive
async function getMetaData() {
    let sheets = google.sheets({
        version: 'v4',
        auth
    });

    let response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range:"Sheet1"
    });

    response = response.data.values;

    let columnNames = response[0];
    let temp = [];

    response.slice(1).forEach((row, rowIndex) => {
        temp[rowIndex] = {};
        columnNames.forEach((column, columnIndex) => {
            temp[rowIndex][column] = row[columnIndex];
        })
    });

    let jsonObject = JSON.stringify(temp);
    return jsonObject;
}

// saves metadata into json file
async function saveMetaData(metadata, filename) {
    await promises.writeFile(filename, metadata, 'utf8');
}
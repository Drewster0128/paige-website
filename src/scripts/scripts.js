import { google } from "googleapis"
import { promises, createWriteStream} from "fs"
import { Writable } from "stream";

const auth = new google.auth.GoogleAuth({
    keyFile: 'env/paigewebsite-c02d0030e691.json',
    scopes: ['https://www.googleapis.com/auth/drive.readonly']
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

async function getImagesOnDrive() {
    let drive = google.drive({
        version: 'v3',
        auth
    });

    let response = await drive.files.list({
        q: `'${process.env.WEBSITE_IMAGES_FOLDER_ID}' in parents`
    });

    response = response.data.files;
    
    //for each file in response, download a blob representation
    for(let image of response) {
        let imageBlob = await drive.files.get({
            fileId: image.id,
            alt: 'media'
        });

        let writableStream = Writable.toWeb(createWriteStream(`public/img/website_images/${image.name}`));
        imageBlob.data.stream().pipeTo(writableStream);
    }
}

//getMetaData()
getImagesOnDrive()
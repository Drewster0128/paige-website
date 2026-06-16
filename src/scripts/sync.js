import { google } from "googleapis"
import { promises, createWriteStream} from "fs"
import { Writable } from "stream"

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.KEYFILE,
    scopes: [process.env.SCOPES]
});

const sheets = google.sheets({
    version: 'v4',
    auth
});

const drive = google.drive({
    version: 'v3',
    auth
});

// fetch meta-data from google drive
async function getMetaData() {

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

    let response = await drive.files.list({
        q: `'${process.env.WEBSITE_IMAGES_FOLDER_ID}' in parents`
    });

    response = response.data.files;
    return response;
}

async function updateImages() {
    
    let driveImages = await getImagesOnDrive();

    let localImages = await promises.readdir('public/img/website_images');
    localImages = new Set(localImages);

    for(const driveImage of driveImages) {
        if(localImages.has(driveImage.name)) {
            localImages.delete(driveImage.name);
        }
        else {
            // driveImage not in local storage, download into public/img/website_images folder
            let imageBlob = await drive.files.get({
                fileId: driveImage.id,
                alt: 'media'
            });

            let writableStream = Writable.toWeb(createWriteStream(`public/img/website_images/${driveImage.name}`));
            imageBlob.data.stream().pipeTo(writableStream);
        }
    }

    //names remaining in localImages list should be removed
    for(const localImage of localImages) {
        await promises.unlink(`public/img/website_images/${localImage}`);
    }
}

console.log("hi!");
let metaData = await getMetaData();
await saveMetaData(metaData, "src/data/pictures.json");

await updateImages();
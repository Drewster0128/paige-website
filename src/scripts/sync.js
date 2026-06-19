import { google } from "googleapis"
import { promises, createWriteStream} from "fs"
import { Writable } from "stream"
import sharp from "sharp"

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

    driveImages.forEach((driveImage) => {
        driveImage.title = driveImage.name.split(".")[0];
    })

    let localImages = (await promises.readdir('public/img/website_images')).map((image) => {
        return image.split(".")[0];
    });

    localImages = new Set(localImages);

    for(const driveImage of driveImages) {
        if(localImages.has(driveImage.title)) {
            localImages.delete(driveImage.title);
        }
        else if(driveImage.name.split(".")[1] !== "HEIC"){
            // driveImage not in local storage, download into public/img/website_images folder
            let imageBlob = await drive.files.get({
                fileId: driveImage.id,
                fields: "*",
                alt: 'media'
            });

            let imageBuffer = await imageBlob.data.arrayBuffer();
            let webpImage = await sharp(imageBuffer).webp()

            let metaData = await webpImage.metadata();

            await webpImage.toFile(`public/img/website_images/${driveImage.title}.webp`);
            
            await webpImage.resize(metaData.width, Math.trunc(metaData.width * 3/4), {
                fit: "cover"
            }).toFile(`public/img/4x3/${driveImage.title}.webp`);
        }
    }

    //names remaining in localImages list should be removed
    for(const localImage of localImages) {
        //delete full version
        await promises.unlink(`public/img/website_images/${localImage}.webp`);

        //delete 4x3 version
        await promises.unlink(`public/img/4x3/${localImage}.webp`);
    }
}

//getMetaData()
//console.log(await getImagesOnDrive())
updateImages()
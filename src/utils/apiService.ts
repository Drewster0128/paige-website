import {type GalleryItem, ok, err, type Event } from "@types";


export async function getGalleryData()
{
    try
    {
        const response = await fetch("https://psychedelicqueenartistry.com/pictures.json");
        const json = await response.json();

        const galleryData : GalleryItem[] = json.map((imageData, index : number) => {
            return {
                legacyId: index,
                slug: imageData['ID'].trim(),
                artPiece: imageData['Art Piece'].trim(),
                filename: `${imageData["ID"].trim()}.webp`,
                description: imageData["Description"].trim(),
                price: imageData["Price"].trim(),
                originalSize: imageData["Original Size"].trim(),
                printSizes: imageData["Print Sizes"].trim().split(","),
                dateCreated: imageData["Date Created"].trim(),
                medium: imageData["Medium"].trim(),
                materal: null,
                availability: imageData["Availability"].trim(),
                //altText: imageData["Alt Text"].trim(),
                featured: false,
                displayOrder: index,
                provisional: false
            };
        });

        return ok(galleryData);
    }
    catch(error : unknown)
    {
        return err(error);
    }
}

export async function getEventData()
{
    try
    {
        const response = await fetch("https://psychedelicqueenartistry.com/events.json");
        const json = await response.json();

        const eventData : Event[] = json.map((e, index : number) => {
            return {
                id: index,
                title: e["Title"],
                startDate: e["Start Date"],
                endDate: e["End Date"],
                venue: e["Venue"],
                location: e["Address"],
                url: e["URL"]
            };
        });

        return ok(eventData);
    }
    catch(error : unknown)
    {
        return err(error);
    }
}
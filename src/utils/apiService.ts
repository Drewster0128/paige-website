import {type GalleryItem, type Event, type Result } from "@types";


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
                price: imageData["Price"] ? imageData["Price"].trim() : null,
                originalSize: imageData["Original Size"].trim(),
                printSizes: imageData["Print Sizes"] ? imageData["Print Sizes"].trim().split(",") : null,
                dateCreated: imageData["Date Created"] ? imageData["Date Created"].trim() : null,
                medium: imageData["Medium"].trim(),
                materal: null,
                availability: imageData["Availability"].trim(),
                //altText: imageData["Alt Text"].trim(),
                featured: false,
                displayOrder: index,
                provisional: false
            };
        });

        const ret : Result<GalleryItem[]> = {
            ok: true,
            value: galleryData
        }
        return ret;
    }
    catch(error : unknown)
    {
        const ret : Result<GalleryItem[]> = {
            ok: false,
            error: error
        }
        return ret;
    }
}

export async function getEventData() : Promise<Result<Event[]>>
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

        const ret : Result<Event[]> = {
            ok: true,
            value: eventData
        };

        return ret;
    }
    catch(error : unknown)
    {
        const ret : Result<Event[]> = {
            ok: false,
            error: error
        };

        return ret;
    }
}
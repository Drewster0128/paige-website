async function loadImageJSON()
{
    let response = await fetch("https://psychedelicqueenartistry.com/pictures.json");
    return response.json();
}

async function filterArtwork(mediums, genres)
{
    //load json from hostinger
    let imageJSON = await loadImageJSON();

    let filteredImageJSON = imageJSON.filter((imageData) => mediums.has(imageData["Medium"]) && genres.has(imageData["Genres"]));
    return filteredImageJSON;
}

function sortArtwork(imageData, key, ascending)
{
    if(key === "title")
    {
        if(ascending == true)
        {
            //sort by title from A-Z
            imageData.sort((a,b) => (
                a["Art Piece"].localeCompare(b["Art Piece"])
            ));
        }
        else
        {
            //sort title from Z-A
            imageData.sort((a,b) => (
                b["Art Piece"].localeCompare(a["Art Piece"])
            ));
        }
    }
    else if(key === "price")
    {
        if(ascending == true)
        {
            //sort by price from smallest to largest
            imageData.sort((a,b) => a["Price"] - b["Price"]);
        }
        else
        {
            //sort by price from largest to smallest
            imageData.sort((a,b) => b - a);
        }
    }
    else if(key === "date")
    {
        if(ascending == true)
        {
            //sort by date with oldest first
            imageData.sort((a,b) => (
                Date.parse(a["Date Created"]) - Date.parse(b["Date Created"])
            ));
        }
        else
        {
            //sort by date with newest first
            imageData.sort((a,b) => (
                Date.parse(b["Date Created"]) - Date.parse(a["Date Created"])
            ));
        }
            
    }

}
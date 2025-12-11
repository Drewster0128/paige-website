import { PictureObject } from "../types"

export function filterByGenre(pictures: PictureObject[], genre: string): PictureObject[] {
  if (genre === "all") {
    return pictures;
  }
  else {
    return pictures.filter((picture: PictureObject) => picture.genre.includes(genre));
  }
}

export function searchFilter(pictures: PictureObject[], searchTerm: string) : PictureObject[] {
  return pictures.filter((picture : PictureObject) => (
    picture.name.substring(0, searchTerm.length).toLowerCase() === searchTerm.toLowerCase()
  ))
}
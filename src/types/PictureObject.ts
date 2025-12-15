import data from "../data/pictures.json" with {type: "json"};
import { type Maybe, Date, type DateInterface } from "../types"

interface PictureInterface {
  id: number;
  name: string;
  imgSrc: string;
  details?: string;
  date?: DateInterface;
  materials?: string;
  genre: string[]
}

export class PictureObject implements PictureInterface {

  static loadPictures(...ids : number[]): PictureObject[] {
    const ret : PictureObject[] = ids.map((id : number ) => this.loadPicture(id));
    return ret;
  }

  static loadPicture(id : number) : PictureObject {
    const picture : Maybe<PictureInterface> = data.find((picture : PictureInterface) => picture.id === id);
    if(picture !== undefined)
    {
      //const {year, month, day} : DateInterface = picture.date;
      return new PictureObject(picture.id, picture.name, picture.imgSrc, picture.genre, picture.details, picture.date, picture.materials, );
    }
    else
    {
      throw new Error("Picture not found!");
    }
  }

  static getNumberofPictures() : number
  {
    return data.length;
  }

  id : number;
  name: string;
  imgSrc: string;
  details?: string;
  date?: Date
  materials?: string
  genre : string[]

  constructor(id : number, name: string, imgSrc: string, genre : string[], details?: string, date?: DateInterface, materials?: string) {
    this.id = id;
    this.name = name;
    this.imgSrc = imgSrc;
    this.details = details;
    this.materials = materials;
    this.genre = genre;

    if(date !== undefined)
    {
      this.date = new Date(date.month, date.day, date.year);
    }
  }

  hasDetails() : boolean {
    return this.details !== undefined;
  }

  // hasDate() : boolean {
  //   return this.date !== undefined;
  // }

  hasMaterials() : boolean {
    return this.materials !== undefined;
  }
}

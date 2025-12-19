import { useParams } from "react-router"
//import { type Maybe } from "../types"
import { PictureObject } from "../types";

export function ImagePage() : React.JSX.Element {
  const id : number = Number(useParams().id);
  const image : PictureObject = PictureObject.loadPicture(id);
  console.log(image.genre);
  return(
    <section className="image-page min-h-full grow px-4 max-w-[1264px] xl:mx-auto flex flex-col-reverse justify-between lg:flex-row gap-x-4 pt-4">
      <div className="max-w-4/5 self-center max-h-screen lg:self-baseline">
        <img src={`../img/full/${image.imgSrc}`}></img>
      </div>
      <div className="details text-end flex flex-col grow">
        <h1 className="text-neutral-100 text-5xl text-center">{image.name}</h1>
        <p className="grow flex items-center justify-center text-2xl text-neutral-100">{image.materials}</p>
      </div>
    </section>
  )
}

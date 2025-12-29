import { PictureBlock } from "./PictureBlock";
import { PictureObject } from "../types";
import { useGetImages } from "../hooks";

export function Carosaul({count} : {count : number}) : React.JSX.Element {

  const images : PictureObject[] = useGetImages(count);

  return(
    <ul>
      {
        images.map((image : PictureObject) => (
          <PictureBlock picture={image} aspectRatio="4x3" ></PictureBlock>
        ))
      }
    </ul>
  )
}
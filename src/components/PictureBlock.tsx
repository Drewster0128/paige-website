import { PictureObject } from "../types";
import { NavLink } from "react-router";

export function PictureBlock({picture, aspectRatio, className} : {picture : PictureObject, aspectRatio : string, className? : string}) : React.JSX.Element {
  return(
    <article className={className}>
      <NavLink to={`/images/${picture.id}`}>
          <img src={`../img/${aspectRatio}/${picture.imgSrc}`}></img>
      </NavLink>
    </article>
  )
}

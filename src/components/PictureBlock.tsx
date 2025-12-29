//import { PictureObject } from "../types";
import { NavLink } from "react-router";

// export function PictureBlock({picture, aspectRatio, className} : {picture : PictureObject, aspectRatio : string, className? : string}) : React.JSX.Element {
//   return(
//     <article className={className}>
//       <NavLink to={`/images/${picture.id}`}>
//           <img src={`../img/${aspectRatio}/${picture.imgSrc}`}></img>
//       </NavLink>
//     </article>
//   )
// }

export function PictureBlock({id, src, aspectRatio, className} : {id : number, src : string, aspectRatio : string, className? : string}) : React.JSX.Element {
  return(
    <article className={className}>
      <NavLink to={`/images/${id}`}>
        <img src={`../img/${aspectRatio}/${src}`}></img>
      </NavLink>
    </article>
  )
}

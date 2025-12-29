//import { NavBar } from "../components"
import { PictureObject } from "../types";
import { PictureBlock, Carosaul } from "../components";
import { useGetImages } from "../hooks";

//Functions

export function Home() {
  const homeImage : PictureObject = PictureObject.loadPicture(2);
  const recentImages : PictureObject[] = useGetImages(10);

  return (
    <>
      <img
        className="w-full max-h-[60lvh] object-cover object-center"
        src={`img/16x9/${homeImage.imgSrc}`}
      ></img>
      <section className="grow">
        <div className="overflow-x-hidden">
          <ul
            className={`flex flex-col gap-4 relative
          sm:flex-row sm:animate-carosel`}
          >
            {recentImages.map((image: PictureObject) => (
              <li className="shrink-0  sm:w-1/4">
                <PictureBlock picture={image} aspectRatio={"4x3"}></PictureBlock>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function Carosaul() : React.JSX.Element

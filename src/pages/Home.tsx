//import { NavBar } from "../components"
import { PictureObject } from "../types";
import { PictureBlock } from "../components";
import { useRef, useEffect, useState } from "react";

export function Home({ className }: { className: string }) {
  const homeImage: PictureObject = PictureObject.loadPicture(2);
  const recentImages: PictureObject[] = Array.from(
    { length: 10 },
    (_, index: number) => PictureObject.loadPicture(index + 1)
  );

  const carosuelRef: React.RefObject<HTMLUListElement | null> = useRef(null);
  const [width, setWidth] = useState(2106);

  useEffect(() => {

    addEventListener("resize", () => {
      setWidth(carosuelRef.current!.scrollWidth)
    })
  })

  return (
    <section className={`flex flex-col gap-y-4 ${className}`}>
      <img
        className="w-full max-h-[60lvh] object-cover object-center"
        src={`img/16x9/${homeImage.imgSrc}`}
      ></img>
      <section className="grow">
        <div className="overflow-x-hidden">
          <ul
            ref={carosuelRef}
            className={`[--carosel-width:${width}px] flex flex-col gap-4 animate-carosel relative
          sm:flex-row`}
          >
            {recentImages.map((image: PictureObject) => (
              <li className="shrink-0 w-1/4">
                <PictureBlock picture={image} aspectRatio={"4x3"}></PictureBlock>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
}

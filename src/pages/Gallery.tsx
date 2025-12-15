import { PictureObject } from "../types";
import { PictureBlock } from "../components";
import { filterByGenre, searchFilter } from "../utils";
import { useState, useRef, useEffect } from "react";

export function Gallery({
  className,
}: {
  className?: string;
}): React.JSX.Element {
  
  const pictures: PictureObject[] = PictureObject.loadPictures(
    ...Array.from({ length: PictureObject.getNumberofPictures() }, (_, index: number) => index + 1)
  );

  const genreRef : React.RefObject<HTMLSelectElement | null> = useRef(null);
  const [genre, setGenre] = useState<string>("all");

  const searchTermRef : React.RefObject<HTMLInputElement | null> = useRef(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    genreRef.current!.addEventListener("change", () => {
      setGenre(genreRef.current!.selectedOptions[0].value);
    });

    searchTermRef.current!.addEventListener("input", () => {
      setSearchTerm(searchTermRef.current!.value);
    })
  })

  return (
    <section className={`${className} flex flex-col gap-y-4 pb-4`}>
      <div
        className={`w-full h-[60lvh] bg-[url(/img/16x9/boat.JPG)] bg-center bg-cover flex justify-center items-center shrink-0`}
      >
        <div className="searchbar w-full max-w-3xl flex flex-row text-lg">
          <input
            className="bg-neutral-100 py-2 px-4 grow outline-0"
            type="search"
            placeholder="Enter Keywords"
            ref={searchTermRef}
          ></input>
          <div className="bg-neutral-100 flex justify-center items-center px-2">
            <select
              name="genre-dropdown"
              className="text-neutral-600 text-sm text-center capitalize"
              ref={genreRef}
            >
              <option value="all">all genres</option>
              <option value="abstract">abstract</option>
              <option value="cartoon">cartoon</option>
              <option value="realism">realism</option>
              <option value="people">people</option>
              <option value="fantasy">fantasy</option>
              <option value="landscape">landscape</option>
              <option value="nature">nature</option>
              <option value="christmas">christmas</option>
            </select>
          </div>
          <button className="searchbutton bg-neutral-950">
            <i className="bi bi-search text-neutral-100 font-bold px-8"></i>
          </button>
        </div>
      </div>
      <article className="grid grid-cols-4 gap-4 shrink-0">
        {filterByGenre(searchFilter(pictures, searchTerm), genre).reverse().map((picture : PictureObject) => (
          <PictureBlock picture={picture} aspectRatio="4x3" className="relative hover:bottom-2"></PictureBlock>
        ))}
      </article>
    </section>
  );
}

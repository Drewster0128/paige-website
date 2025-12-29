import { useState, useEffect } from "react";
import { PictureObject } from "../types";

export function useGetImages(count : number) : PictureObject[] {

  const [images, setImages] = useState<PictureObject[]>([]);

  async function fetchImages() {
    fetch("../src/data/pictures.json")
      .then((ret) => ret.json())
      .then((ret) => {
        ret = ret.slice(0, count);
        setImages(ret);
      })
  }

  useEffect(() => {
    fetchImages();
  }, [count])

  return images;
}
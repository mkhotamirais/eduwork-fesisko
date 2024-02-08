import axios from "axios";
import { useEffect, useState } from "react";
import { galleryUrl } from "../../constants/contants";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  useEffect(() => {
    getGallery();
  }, []);
  const getGallery = async () => {
    const response = await axios.get(galleryUrl);
    setGallery(response.data.data);
  };
  return (
    <>
      <h1 className="leading-loose text-2xl font-medium text-center my-4">Gallery</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-5">
        {gallery.map((gall) => (
          <figure key={gall.web_gallery_id} className="bg-white rounded-full">
            <img src={gall.url} alt={gall.web_gallery_name} />
            <figcaption className="text-center capitalize text-sm">
              <i>{gall.web_gallery_name}</i>
            </figcaption>
          </figure>
        ))}
      </section>
    </>
  );
};

export default Gallery;

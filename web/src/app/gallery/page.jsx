import ImageMasonry from "components/ImageMasonry";
import ImageModal from "components/ImageModal";

import fs from "fs";
import path from "path";

export const metadata = {
  title: "Gallery",
};

export default async function Gallery({ searchParams, limit = undefined }) {
  const dir = path.resolve(__dirname, "../../../../public/assets/gallery");
  const files = fs.readdirSync(dir).map((file) => `/assets/gallery/${file}`);

  return (
    <>
      {files && files.length ? (
        <>
          <ImageMasonry
            images={files}
            linkPrefix="/gallery?img="
            limit={limit}
          />
          <ImageModal images={files} id={searchParams?.img} />
        </>
      ) : (
        <center>
          <h2>Gallery not found!</h2>
        </center>
      )}
    </>
  );
}

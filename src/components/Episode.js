import { memo } from "react";
import ListItem from "./ListItem";

export default memo(function Episode({ images, id, external_urls, release_date, name, description }) {
  return (
    <ListItem 
      imageUrl={images.length ? images[0].url : ""}
      id={id} 
      externalUrl={external_urls?.spotify}
      releaseDate={release_date}
      name={description}
      artist={name}
    />
  );
})
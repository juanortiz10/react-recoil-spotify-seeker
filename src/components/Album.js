import { memo } from "react";
import ListItem from "./ListItem";

export default memo(function Album({ images, id, external_urls, release_date, name, artists }) {
  return (
    <ListItem 
      imageUrl={images.length ? images[0].url : ""}
      id={id} 
      externalUrl={external_urls?.spotify}
      releaseDate={release_date}
      name={name}
      artist={artists[0].name}
    />
  );
})
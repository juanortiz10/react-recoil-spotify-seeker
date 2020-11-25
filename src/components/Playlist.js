import { memo } from "react";
import ListItem from "./ListItem";

export default memo(function Playlist({ images, id, description, name, external_urls }) {
  return (
    <ListItem 
      imageUrl={images.length ? images[0].url : ""}
      id={id} 
      externalUrl={external_urls?.spotify}
      releaseDate=""
      name={description}
      artist={name}
    />
  );
})
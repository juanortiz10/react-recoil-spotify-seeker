import { memo } from "react";

import "./style.css";

export default memo(function ListItem({ imageUrl, id, externalUrl, releaseDate, name, artist }) {
  const handleListItemClick = () => {
    window.open(externalUrl, "_blank");
  };
  
  return (
    <div className="list-item" onClick={handleListItemClick}>
      <img src={imageUrl} alt={id} />
      <p className="list-item-title">{name}</p>
      <p className="list-item-artist">{artist}</p>
      <p className="list-item-release-date">{releaseDate}</p>
    </div>
  );
});
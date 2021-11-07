import React, { useContext } from "react";
import { TCardPropsTypes } from ".";

import "./styles.scss";
import { ModalContext, TModalContext } from "../../providers/modal-provider";
import { ACTIONS } from "../../providers/modal-provider/actions";

export const Card: React.FC<TCardPropsTypes> = ({
  children,
  id,
  albumId,
  title,
  url,
  thumbnailUrl,
}) => {
  const { dispatch } = useContext<TModalContext>(ModalContext);

  const onModalOpen = () => {
    dispatch({
      type: ACTIONS.CREATE_MODAL,
      payload: { id, albumId, title, url, thumbnailUrl, isOpen: true },
    });
    console.log(ACTIONS.CREATE_MODAL);
    console.log(id, albumId, title, url, thumbnailUrl);
  };
  return (
    <div id={id.toString()} className="card-container">
      <p className="card-album-id">{`Album Id${albumId}`}</p>
      <p className="card-id">{`Id${id}`}</p>
      <h1 className="card-title">{title}</h1>
      <img src={thumbnailUrl} onClick={onModalOpen} alt={title} />
      {children}
    </div>
  );
};

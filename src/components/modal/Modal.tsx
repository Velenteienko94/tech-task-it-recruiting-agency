import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  ModalContext,
  TModalContext,
  TModalState,
} from "../../providers/modal-provider";

import "./styles.scss";

export type TModalProps = {
  renderModal: (state: TModalState) => JSX.Element | null;
};

export const Modal = ({ renderModal }: TModalProps) => {
  const [wrapper, setWrapper] = useState<HTMLElement | null>(null);

  const { state } = useContext<TModalContext>(ModalContext);

  useEffect(() => {
    const wrapper = document.getElementById("modalWrapper");

    setWrapper(wrapper);
  }, []);

  let content =
    state && state.isOpen ? (
      <div>{renderModal ? renderModal(state) : null}</div>
    ) : null;
  if (state && state.isOpen === false) {
    content = null;
  }
  return wrapper ? ReactDOM.createPortal(content, wrapper) : null;
};

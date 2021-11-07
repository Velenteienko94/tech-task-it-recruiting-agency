import { FC, useReducer } from "react";
import { ModalContext, TModalActon, TModalState } from "./index";

const modalReducer = (state: TModalState, action: TModalActon): TModalState => {
  switch (action.type) {
    case "create":
      return action && action.payload;
    case "togle":
      return state && { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
};

export const ModalStateProvider: FC = ({ children }) => {
  const [modalState, modalDispatch] = useReducer<typeof modalReducer>(
    modalReducer,
    null
  );
  return (
    <ModalContext.Provider
      value={{ state: modalState, dispatch: modalDispatch }}
    >
      {children}
    </ModalContext.Provider>
  );
};

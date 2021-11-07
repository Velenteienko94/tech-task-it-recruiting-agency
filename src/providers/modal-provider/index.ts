import React from "react";

export type TModalState = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  isOpen: boolean;
} | null;

export type TModalActon = {
  type: string;
  payload: TModalState;
};

export type TModalContext = {
  state: TModalState | null;
  dispatch: React.Dispatch<TModalActon>;
};

export const ModalContext = React.createContext<TModalContext>({
  state: null,
  dispatch: () => void 0,
});

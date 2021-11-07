import React from "react";
import { Card } from "./Card";

export type TCardPropsTypes = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  children?: React.ReactNode;
};

export default Card;

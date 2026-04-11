import React from "react";
export interface IContainer {
    children: JSX.Element | JSX.Element[];
    deviceFrame?: React.ElementType;
    dark?: boolean;
    setDark?: React.Dispatch<React.SetStateAction<boolean>>;
    /** URL of the skin image for device frame */
    skin?: string;
    /** Opacity of the skin artwork (0-1) */
    skinOpacity?: number;
}
declare const Container: React.FC<IContainer>;
export default Container;

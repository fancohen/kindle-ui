import React from "react";
export interface IContainer {
    children: JSX.Element | JSX.Element[];
    dark?: boolean;
    /** URL of the skin image to apply as device shell texture */
    skin?: string;
    /** Opacity of the skin artwork (0-1), default 0.45. Higher = more visible artwork. */
    skinOpacity?: number;
}
declare const Container: React.FC<IContainer>;
export default Container;

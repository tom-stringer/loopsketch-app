import React, { FunctionComponent } from "react";
import { ReactComponent as OptionsSvg } from "../../../public/graphics/basic-ui/025-ellipsis.svg";

type Props = {
    handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    CustomSvg?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

const OptionsButton: FunctionComponent<Props> = ({ handleClick, CustomSvg }) => {
    const svgClassName = "svg svg__muted svg--1-25rem ";
    let buttonClassName = "button button--invisible options-button";

    return (
        <button onClick={(event) => handleClick(event)} className={buttonClassName}>
            {CustomSvg ? <CustomSvg className={svgClassName} /> : <OptionsSvg className={svgClassName} />}
        </button>
    );
};

export default OptionsButton;

import React, { FunctionComponent } from "react";

type Props = {
    onClick: () => void;
    setShowMenu?: (value: boolean) => void;
};

const OptionsMenuLink: FunctionComponent<Props> = ({ onClick, setShowMenu, children }) => {
    const handleClick = () => {
        onClick();
        setShowMenu!(false);
    };

    return (
        <div onClick={() => handleClick()} className="options-menu__link">
            {children}
        </div>
    );
};

export default OptionsMenuLink;

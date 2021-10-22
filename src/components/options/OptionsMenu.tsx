import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import OptionsButton from "./OptionsButton";

type Props = {
    label?: string;
    className?: string;
};

const OptionsMenu: FunctionComponent<Props> = ({ label, className, children }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menu = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const handleClick = (event: MouseEvent) => {
        // Outside click.
        if (!menu.current?.contains(event.target as Node)) {
            setShowMenu(false);
        }
    };

    const clonedChildren = React.Children.map(children, (child) => {
        if (child) {
            return React.cloneElement(child as React.ReactElement, { setShowMenu });
        }
    });

    let contentClasses = "options-menu__content";
    if (className && className !== "") {
        contentClasses += " " + className;
    }

    return (
        <div ref={menu} className="options-menu">
            <OptionsButton handleClick={() => setShowMenu((previous) => !previous)} />
            {showMenu && (
                <div className={contentClasses}>
                    {label && label.trim() !== "" && <label className="options-menu__label">{label}</label>}
                    {clonedChildren}
                </div>
            )}
        </div>
    );
};

export default OptionsMenu;

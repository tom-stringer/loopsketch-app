import React, { FunctionComponent } from "react";
import PROPERTIES from "../../properties";

type Props = {
    title: string;
    close: () => void;
};

const ModalHeader: FunctionComponent<Props> = (props) => {
    return (
        <header className="modal__head">
            <h1 className="modal__title">{props.title}</h1>
            <h1 className="modal__close" onClick={props.close}>
                {PROPERTIES.CHARACTERS.TIMES}
            </h1>
        </header>
    );
};

export default ModalHeader;

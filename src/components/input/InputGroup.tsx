import React, { FunctionComponent } from "react";

type Props = {
    label?: string;
};

const InputGroup: FunctionComponent<Props> = (props) => {
    return (
        <div className="input__group">
            {props.label && <label className="input__label">{props.label}</label>}
            {props.children}
        </div>
    );
};

export default InputGroup;

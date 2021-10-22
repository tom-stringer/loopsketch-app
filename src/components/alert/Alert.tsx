import React, { FunctionComponent } from "react";

type Props = {
    type: "error" | "alert" | "success";
};

const Alert: FunctionComponent<Props> = (props) => {
    const alertClass = "alert alert--" + props.type;
    return <div className={alertClass}>{props.children}</div>;
};

export default Alert;

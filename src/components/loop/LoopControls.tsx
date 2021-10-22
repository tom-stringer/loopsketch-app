import React, { FunctionComponent } from "react";
import { Loop } from "../../types/loop-types";
import LoopOptionsMenu from "./LoopOptionsMenu";
import LoopPlayButton from "./LoopPlayButton";
import LoopTempoControls from "./LoopTempoControls";

type Props = {
    loop: Loop;
};

const LoopControls: FunctionComponent<Props> = ({ loop }) => {
    return (
        <div className="loop-editor__controls">
            <LoopPlayButton loop={loop} classes="loop-editor__play-button" />
            <LoopTempoControls loop={loop} />
            <LoopOptionsMenu loop={loop} />
        </div>
    );
};

export default LoopControls;

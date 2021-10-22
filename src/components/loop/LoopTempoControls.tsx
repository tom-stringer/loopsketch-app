import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { Loop } from "../../types/loop-types";
import { setTempo } from "../../redux/slices/loop-slice";
import LoopTempoInput from "./LoopTempoInput";

type Props = {
    loop: Loop;
};

const LoopTempoControls: FunctionComponent<Props> = ({ loop }) => {
    const dispatch = useDispatch();

    return (
        <div className="loop-editor__tempo">
            <button
                className="button button--background"
                onClick={() => dispatch(setTempo({ id: loop.id, tempo: loop.tempo - 1 }))}
            >
                {"<"}
            </button>
            <LoopTempoInput loop={loop} />
            <button
                className="button button--background"
                onClick={() => dispatch(setTempo({ id: loop.id, tempo: loop.tempo + 1 }))}
            >
                {">"}
            </button>
        </div>
    );
};

export default LoopTempoControls;

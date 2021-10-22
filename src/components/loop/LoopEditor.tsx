import React, { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { stopLoop } from "../../redux/slices/loop-slice";
import { Loop } from "../../types/loop-types";
import { isUnsaved } from "../../utils/loop-utils";
import AddBarsModal from "./AddBarsModal";
import ChangeInstrumentsModal from "./ChangeInstrumentsModal";
import LoopBars from "./LoopBars";
import LoopControls from "./LoopControls";
import SaveLoopAsModal from "./SaveLoopAsModal";
import { useStepPlayer } from "../../hooks/loop-hooks";
import LoopEditorBanner from "./LoopEditorBanner";

type Props = {
    loop: Loop;
};

const LoopEditor: FunctionComponent<Props> = ({ loop }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(stopLoop());
        };
    }, []);

    useStepPlayer(loop);

    return (
        <main>
            <LoopEditorBanner loop={loop} />
            <article className="loop-editor">
                <LoopControls loop={loop} />
                <LoopBars loop={loop} />
                <AddBarsModal loop={loop} />
                <ChangeInstrumentsModal loop={loop} />
                {isUnsaved(loop) && <SaveLoopAsModal loop={loop} />}
            </article>
        </main>
    );
};

export default LoopEditor;

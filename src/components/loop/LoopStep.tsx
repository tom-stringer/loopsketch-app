import React, { FunctionComponent, useRef } from "react";
import { useDispatch } from "react-redux";
import { Loop, Step } from "../../types/loop-types";
import { toggleStep } from "../../redux/slices/loop-slice";

type Props = {
    loop: Loop;
    instrument: string;
    bar: number;
    step: number;
    value: Step;
};

const LoopStep: FunctionComponent<Props> = ({ loop, instrument, bar, step, value }) => {
    const dispatch = useDispatch();
    const button = useRef<HTMLButtonElement>(null);
    const disabledClass = "button loop-editor__step";
    const enabledClass = "button loop-editor__step loop-editor__step--enabled";

    const handleToggle = () => {
        dispatch(
            toggleStep({
                id: loop.id,
                instrument,
                bar,
                step,
            })
        );
        button.current?.blur();
    };

    return (
        <button
            key={instrument + bar + "step" + step}
            className={value ? enabledClass : disabledClass}
            onClick={() => handleToggle()}
            ref={button}
        />
    );
};

export default LoopStep;

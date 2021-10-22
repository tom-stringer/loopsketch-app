import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loop } from "../../types/loop-types";
import PROPERTIES from "../../properties";
import {
    removeBar,
    selectCurrentBar,
    selectCurrentLoop,
    selectCurrentStep,
    selectIsPlaying,
    selectIsRemovingBars,
} from "../../redux/slices/loop-slice";

type Props = {
    loop: Loop;
};

const LoopIndicators: FunctionComponent<Props> = ({ loop }) => {
    const dispatch = useDispatch();
    const isRemovingBars = useSelector(selectIsRemovingBars);
    const isPlaying = useSelector(selectIsPlaying);
    const currentLoop = useSelector(selectCurrentLoop);
    const currentStep = useSelector(selectCurrentStep);
    const currentBar = useSelector(selectCurrentBar);

    const isCurrentStep = (bar: number, step: number) => {
        return isPlaying && loop.id === currentLoop && bar === currentBar && step === currentStep;
    };

    const handleClick = (barIndex: number) => {
        if (isRemovingBars) {
            dispatch(removeBar({ id: loop.id, bar: barIndex }));
        }
    };

    let barIndicatorClasses = "loop-editor__bar-indicator";
    if (isRemovingBars) {
        barIndicatorClasses += " loop-editor__bar-indicator--removing-bars";
    }

    const indicatorRow = new Array(loop.barCount).fill(0).map((_, barIndex) => (
        <div key={barIndex} onClick={() => handleClick(barIndex)} className={barIndicatorClasses}>
            {isRemovingBars && (
                <div className="loop-editor__bar-indicator__remove-label">{PROPERTIES.CHARACTERS.TIMES}</div>
            )}
            {!isRemovingBars &&
                new Array(loop.barLength).fill(0).map((__, stepIndex) => {
                    let classes = "loop-editor__step-indicator";
                    if (isCurrentStep(barIndex, stepIndex)) {
                        classes += " loop-editor__step-indicator--current";
                    }
                    return <div key={stepIndex} className={classes} />;
                })}
        </div>
    ));

    return <div className="loop-editor__bar-indicators">{indicatorRow}</div>;
};

export default LoopIndicators;

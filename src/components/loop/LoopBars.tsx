import React, { FunctionComponent } from "react";
import { Loop } from "../../types/loop-types";
import { getInstrumentCount, instrumentMap } from "../../utils/loop-utils";
import LoopIndicators from "./LoopIndicators";
import LoopStep from "./LoopStep";

type Props = {
    loop: Loop;
};

const LoopBars: FunctionComponent<Props> = ({ loop }) => {
    const bars = Object.keys(loop.instruments).map((instrument, instrumentIndex) => (
        <div key={instrument} className="loop-editor__instrument">
            {loop.instruments[instrument].map((bar, barIndex) => (
                <div key={instrument + barIndex} className="loop-editor__bar">
                    {/* Label */}
                    {barIndex === 0 && <p className="loop-editor__label">{instrumentMap[instrument]}</p>}
                    {/* Steps */}
                    <div className="loop-editor__steps">
                        {bar.map((step, stepIndex) => (
                            <LoopStep
                                loop={loop}
                                instrument={instrument}
                                bar={barIndex}
                                step={stepIndex}
                                value={step}
                            />
                        ))}
                    </div>
                    {/* Bar number */}
                    {instrumentIndex === getInstrumentCount(loop) - 1 && (
                        <p className="loop-editor__number">{barIndex + 1}</p>
                    )}
                </div>
            ))}
        </div>
    ));

    return (
        <div className="loop-editor__bars">
            <LoopIndicators loop={loop} />
            {bars}
        </div>
    );
};

export default LoopBars;

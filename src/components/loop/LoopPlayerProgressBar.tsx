import React, { FunctionComponent } from "react";
import { Loop } from "../../../../interface/src/types/loop-types";
import LoopPlayButton from "./LoopPlayButton";
import { useCurrentPlayingLoopChecker } from "../../hooks/loop-hooks";
import { useSelector } from "react-redux";
import { selectCurrentBar, selectCurrentStep } from "../../redux/slices/loop-slice";

type Props = {
    loop: Loop;
};

const LoopPlayerProgressBar: FunctionComponent<Props> = ({ loop }) => {
    const isCurrentlyPlaying = useCurrentPlayingLoopChecker(loop);
    const currentBar = useSelector(selectCurrentBar);
    const currentStep = useSelector(selectCurrentStep);

    const getProgressPercentage = (): number => {
        if (isCurrentlyPlaying) {
            const progress = ((currentBar * loop.barLength + currentStep) / (loop.barLength * loop.barCount)) * 100;
            return progress ? progress : 1;
        } else {
            return 0;
        }
    };

    return (
        <div className="loop-player__progress">
            <div className="loop-player__progress__bar">
                <div className="loop-player__progress__completed" style={{ width: getProgressPercentage() + "%" }} />
            </div>
            <LoopPlayButton loop={loop} classes="loop-player__progress__button" />
        </div>
    );
};

export default LoopPlayerProgressBar;

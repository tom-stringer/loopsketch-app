import { useEffect } from "react";
import { Loop } from "../../../interface/src/types/loop-types";
import { getStepDelayMillis, playInstruments } from "../utils/loop-utils";
import {
    nextStep,
    selectCurrentBar,
    selectCurrentLoop,
    selectCurrentStep,
    selectIsPlaying,
} from "../redux/slices/loop-slice";
import { useDispatch, useSelector } from "react-redux";

export const useStepPlayer = (loop: Loop) => {
    const dispatch = useDispatch();
    const isCurrentlyPlaying = useCurrentPlayingLoopChecker(loop);
    const currentStep = useSelector(selectCurrentStep);
    const currentBar = useSelector(selectCurrentBar);

    useEffect(() => {
        if (isCurrentlyPlaying) {
            playInstruments(loop, currentBar, currentStep);
            window.setTimeout(() => dispatch(nextStep()), getStepDelayMillis(loop));
        }
    }, [currentStep, isCurrentlyPlaying]);
};

export const useCurrentPlayingLoopChecker = (loop: Loop): boolean => {
    const isPlaying = useSelector(selectIsPlaying);
    const currentLoop = useSelector(selectCurrentLoop);

    return isPlaying && currentLoop === loop.id;
};

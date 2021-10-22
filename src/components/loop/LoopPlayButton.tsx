import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { Loop } from "../../types/loop-types";
import { playLoop, stopLoop } from "../../redux/slices/loop-slice";
import { useCurrentPlayingLoopChecker } from "../../hooks/loop-hooks";
import { ReactComponent as PlayButtonSvg } from "../../../public/graphics/music/028-play.svg";
import { ReactComponent as StopButtonSvg } from "../../../public/graphics/music/013-stop.svg";

type Props = {
    loop: Loop;
    classes?: string;
};

const LoopPlayButton: FunctionComponent<Props> = ({ loop, classes }) => {
    const dispatch = useDispatch();
    const isCurrentlyPlaying = useCurrentPlayingLoopChecker(loop);

    const handleClickPlay = () => {
        dispatch(playLoop(loop.id));
    };

    const handleClickStop = () => {
        dispatch(stopLoop());
    };

    const buttonClass = classes ? "button " + classes : "button";
    const svgClass = "svg svg__surface svg--1-75rem";

    return (
        <button
            className={buttonClass}
            onClick={isCurrentlyPlaying ? () => handleClickStop() : () => handleClickPlay()}
        >
            {isCurrentlyPlaying ? <StopButtonSvg className={svgClass} /> : <PlayButtonSvg className={svgClass} />}
        </button>
    );
};

export default LoopPlayButton;

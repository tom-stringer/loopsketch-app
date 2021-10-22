import React, { FunctionComponent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { stopLoop } from "../../redux/slices/loop-slice";
import { Loop } from "../../types/loop-types";
import { useStepPlayer } from "../../hooks/loop-hooks";
import LoopPlayerProgressBar from "./LoopPlayerProgressBar";

type Props = {
    loop: Loop;
};

const LoopPlayer: FunctionComponent<Props> = ({ loop }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(stopLoop());
        };
    }, []);

    useStepPlayer(loop);

    return (
        <article className="loop-player">
            <h1 className="loop-player__title">{loop.title}</h1>
            <p className="loop-player__description">Description will go here</p>
            <LoopPlayerProgressBar loop={loop} />
        </article>
    );
};

export default LoopPlayer;

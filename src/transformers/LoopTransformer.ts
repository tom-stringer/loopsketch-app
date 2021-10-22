import { CreateLoopRequest, Instrument, Loop, UpdateLoopRequest } from "../../../interface/src/types/loop-types";
import { NEW_BAR, NEW_LOOP_ID } from "../utils/loop-utils";

export default class LoopTransformer {
    static newLoop = (): Loop => ({
        id: NEW_LOOP_ID,
        title: "New loop",
        tempo: 60,
        barLength: 4,
        barCount: 4,
        instruments: {
            kick: new Array(4).fill(NEW_BAR) as Instrument,
            snare: new Array(4).fill(NEW_BAR) as Instrument,
        },
    });

    static toCreateLoopRequest = (loop: Loop): CreateLoopRequest => ({
        title: loop.title,
        tempo: loop.tempo,
        barLength: loop.barLength,
        barCount: loop.barCount,
        instruments: loop.instruments,
    });

    static toUpdateLoopRequest = (loop: Loop): UpdateLoopRequest => ({
        userId: loop.userId!,
        title: loop.title,
        tempo: loop.tempo,
        barLength: loop.barLength,
        barCount: loop.barCount,
        instruments: loop.instruments,
    });
}

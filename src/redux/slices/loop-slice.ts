import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import PROPERTIES from "../../properties";
import { getNewLoop, hasInstruments, NEW_BAR } from "../../utils/loop-utils";
import { RootState } from "../store";
import { Loop, Step } from "../../../../interface/src/types/loop-types";
import loopQueries from "../queries/loop-queries";

type LoopState = {
    loops: Record<number, Loop>;
    currentLoop: number | null;
    isPlaying: boolean;
    currentBar: number;
    currentStep: number;
    isRemovingBars: boolean;
};

const initialState: LoopState = {
    loops: {},
    currentLoop: null,
    isPlaying: false,
    currentBar: 0,
    currentStep: 0,
    isRemovingBars: false,
};

const loopSlice = createSlice({
    name: "loop",
    initialState,
    reducers: {
        editNewLoop: (state) => {
            state.currentLoop = 0;
            state.loops = {
                0: getNewLoop(),
            };
        },
        toggleStep: (
            state,
            action: PayloadAction<{
                id: number;
                instrument: string;
                bar: number;
                step: number;
            }>
        ) => {
            const { id, instrument, bar, step } = action.payload;
            const steps = state.loops[id].instruments[instrument][bar];

            steps[step] = Number(!steps[step]) as Step;
        },
        playLoop: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const loop = state.loops[id];
            state.currentLoop = id;
            state.currentBar = 0;
            state.currentStep = 0;
            state.isPlaying = hasInstruments(loop);
        },
        stopLoop: (state) => {
            state.currentLoop = null;
            state.isPlaying = false;
            state.currentBar = 0;
            state.currentStep = 0;
        },
        nextStep: (state) => {
            if (state.currentLoop !== null) {
                const loop = state.loops[state.currentLoop];

                if (hasInstruments(loop)) {
                    state.currentStep++;

                    if (state.currentStep > loop.barLength - 1) {
                        state.currentStep = 0;
                        state.currentBar = (state.currentBar + 1) % loop.barCount;
                    }
                } else {
                    state.isPlaying = false;
                    state.currentStep = 0;
                    state.currentBar = 0;
                }
            } else {
                state.isPlaying = false;
                state.currentStep = 0;
                state.currentBar = 0;
            }
        },
        addBar: (state, action: PayloadAction<number>) => {
            const loop = state.loops[action.payload];

            if (hasInstruments(loop)) {
                for (const instrument in loop.instruments) {
                    loop.instruments[instrument].push(NEW_BAR);
                }
                loop.barCount++;
            }
        },
        addBars: (state, action: PayloadAction<{ id: number; amount: number }>) => {
            const { id, amount } = action.payload;
            const loop = state.loops[id];

            if (amount > 0 && hasInstruments(loop)) {
                for (let i = 0; i < amount; i++) {
                    for (const instrument in loop.instruments) {
                        loop.instruments[instrument].push(NEW_BAR);
                    }
                    loop.barCount++;
                }
            }
        },
        removeBar: (state, action: PayloadAction<{ id: number; bar: number }>) => {
            const { id, bar } = action.payload;
            const loop = state.loops[id];

            if (bar >= 0 && bar < loop.barCount) {
                for (const instrument in loop.instruments) {
                    loop.instruments[instrument].splice(bar, 1);
                }
                loop.barCount--;
            }
        },
        addInstrument: (state, action: PayloadAction<{ id: number; instrument: string }>) => {
            const { id, instrument } = action.payload;
            const loop = state.loops[id];

            if (!Object.keys(loop.instruments).includes(instrument)) {
                loop.instruments[instrument] = new Array(loop.barCount).fill(NEW_BAR);
            }
        },
        removeInstrument: (state, action: PayloadAction<{ id: number; instrument: string }>) => {
            const { id, instrument } = action.payload;
            const loop = state.loops[id];

            if (Object.keys(loop.instruments).includes(instrument)) {
                delete loop.instruments[instrument];
            }
        },
        setTempo: (state, action: PayloadAction<{ id: number; tempo: number }>) => {
            const { id, tempo } = action.payload;
            state.loops[id].tempo = _.clamp(tempo, PROPERTIES.LOOP.MIN_TEMPO, PROPERTIES.LOOP.MAX_TEMPO);
        },
        setIsRemovingBars: (state, action: PayloadAction<boolean>) => {
            state.isRemovingBars = action.payload;
        },
        setTitle: (state, action: PayloadAction<{ id: number; title: string }>) => {
            const { id, title } = action.payload;
            state.loops[id].title = title;
        },
        clearLoops: (state) => {
            state.loops = {};
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(loopQueries.endpoints.getAllLoops.matchFulfilled, (state, action) => {
                const { data } = action.payload.result;

                if (data) {
                    data.loops.forEach((loop) => (state.loops[loop.id] = loop));
                }
            })
            .addMatcher(loopQueries.endpoints.getLoop.matchFulfilled, (state, action) => {
                const { data } = action.payload.result;

                if (data) {
                    state.loops[data.loop.id] = data.loop;
                }
            })
            .addMatcher(loopQueries.endpoints.getLoopsByUser.matchFulfilled, (state, action) => {
                const { data } = action.payload.result;

                if (data) {
                    data.loops.forEach((loop) => (state.loops[loop.id] = loop));
                }
            })
            .addMatcher(loopQueries.endpoints.createLoop.matchFulfilled, (state, action) => {
                const { data } = action.payload.result;

                if (data) {
                    state.loops[data.loop.id] = data.loop;
                }
            })
            .addMatcher(loopQueries.endpoints.updateLoop.matchFulfilled, (state, action) => {
                const { data } = action.payload.result;

                if (data) {
                    state.loops[data.loop.id] = data.loop;
                }
            });
    },
});

export const {
    editNewLoop,
    toggleStep,
    playLoop,
    stopLoop,
    nextStep,
    addBar,
    addBars,
    removeBar,
    addInstrument,
    removeInstrument,
    setTempo,
    setIsRemovingBars,
    setTitle,
} = loopSlice.actions;

export const selectLoops = (state: RootState) => state.loop.loops;
export const selectIsRemovingBars = (state: RootState) => state.loop.isRemovingBars;
export const selectCurrentLoop = (state: RootState) => state.loop.currentLoop;
export const selectIsPlaying = (state: RootState) => state.loop.isPlaying;
export const selectCurrentBar = (state: RootState) => state.loop.currentBar;
export const selectCurrentStep = (state: RootState) => state.loop.currentStep;

export default loopSlice.reducer;

import { Howl } from "howler";
import { Instrument, Loop, Step } from "../types/loop-types";

export const NEW_LOOP_ID = 0;
export const NEW_BAR = [0, 0, 0, 0] as Step[];

export const soundSprite = new Howl({
    src: [process.env.PUBLIC_URL + "/sounds/drums.mp3"],
    sprite: {
        cowbell: [0, 300],
        conga_hi: [400, 300],
        conga_mid: [4455, 202],
        conga_low: [4863, 343],
        cymbal: [807, 3640],
        hihat_open: [5268, 706],
        hihat_closed: [7496, 90],
        maracas: [6684, 53],
        tom_hi: [6277, 206],
        tom_mid: [7092, 263],
        tom_low: [7903, 370],
        clave: [8307, 44],
        clap: [8712, 208],
        snare: [9116, 137],
        rim: [9521, 36],
        kick: [9929, 390],
    },
});

export const instrumentMap: { [key: string]: string } = {
    cowbell: "Cowbell",
    conga_hi: "High conga",
    conga_mid: "Mid conga",
    conga_low: "Low conga",
    cymbal: "Cymbal",
    hihat_open: "Open hat",
    hihat_closed: "Closed hat",
    maracas: "Maracas",
    tom_hi: "High tom",
    tom_mid: "Mid tom",
    tom_low: "Low tom",
    clave: "Clave",
    clap: "Clap",
    snare: "Snare",
    rim: "Rim",
    kick: "Kick",
};

export const getStepDelayMillis = (loop: Loop) => {
    return 1000 / ((loop.tempo / 60) * loop.barLength);
};

export const hasInstruments = (loop: Loop) => {
    return Object.keys(loop.instruments).length > 0;
};

export const getInstrumentCount = (loop: Loop) => {
    return Object.keys(loop.instruments).length;
};

/**
 * Get new Loop for editing. Id 0 is reserved for unsaved loop.
 */
export const getNewLoop = (): Loop => {
    return {
        id: NEW_LOOP_ID,
        title: "New loop",
        tempo: 60,
        barLength: 4,
        barCount: 4,
        instruments: {
            kick: new Array(4).fill(NEW_BAR) as Instrument,
            snare: new Array(4).fill(NEW_BAR) as Instrument,
        },
    };
};

export const isUnsaved = (loop: Loop) => {
    return loop.id === NEW_LOOP_ID;
};

export const playInstruments = (loop: Loop, currentBar: number, currentStep: number) => {
    Object.keys(loop.instruments).forEach((instrument) => {
        if (loop.instruments[instrument][currentBar][currentStep]) {
            soundSprite.play(instrument);
        }
    });
};

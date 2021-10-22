import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { Loop } from "../../types/loop-types";
import { addInstrument, removeInstrument } from "../../redux/slices/loop-slice";
import { Modals } from "../../redux/slices/modal-slice";
import { hasInstruments as loopHasInstruments, instrumentMap } from "../../utils/loop-utils";
import Modal from "../modal/Modal";

type Props = {
    loop: Loop;
};

const ChangeInstrumentsModal: FunctionComponent<Props> = ({ loop }) => {
    const dispatch = useDispatch();
    const hasInstruments = loopHasInstruments(loop);
    const unusedInstruments = Object.keys(instrumentMap).filter(
        (instrument) => !Object.keys(loop.instruments).includes(instrument)
    );

    const handleClickInstrument = (instrument: string) => {
        dispatch(removeInstrument({ id: loop.id, instrument }));
    };

    const handleClickAddInstrument = (instrument: string) => {
        dispatch(addInstrument({ id: loop.id, instrument }));
    };

    const instrumentsList = (
        <div className="modal__button-list">
            {Object.keys(loop.instruments).map((instrument) => (
                <button onClick={() => handleClickInstrument(instrument)} className="button">
                    {instrumentMap[instrument]}
                </button>
            ))}
        </div>
    );

    const addInstrumentsList = (
        <div className="modal__button-list">
            {unusedInstruments.map((instrument) => (
                <button onClick={() => handleClickAddInstrument(instrument)} className="button button--background">
                    {instrumentMap[instrument]}
                </button>
            ))}
        </div>
    );

    return (
        <Modal type={Modals.ADD_INSTRUMENT} title="Change instruments">
            <div className="modal__body">
                {/* Current */}
                {hasInstruments && <p className="modal__subheading">Currently selected</p>}
                {hasInstruments && instrumentsList}
                {/* Add */}
                <p className="modal__subheading">{hasInstruments ? "Add more" : "Add instruments"}</p>
                {addInstrumentsList}
            </div>
        </Modal>
    );
};

export default ChangeInstrumentsModal;

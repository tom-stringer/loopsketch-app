import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../redux/slices/loop-slice";
import { Modals } from "../../redux/slices/modal-slice";
import { Loop } from "../../types/loop-types";
import InputGroup from "../input/InputGroup";
import Modal from "../modal/Modal";
import { useCreateLoopMutation } from "../../redux/queries/loop-queries";
import { Redirect } from "react-router-dom";

type Props = {
    loop: Loop;
};

/**
 * Modal to save the loop for the first time. Should not be shown on consecutive saves.
 */
const SaveLoopAsModal: FunctionComponent<Props> = ({ loop }) => {
    const dispatch = useDispatch();
    const [createLoop, { data: savedLoop, isSuccess: isSaved }] = useCreateLoopMutation();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTitle({ id: loop.id, title: event.target.value }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        createLoop(loop);
    };

    if (isSaved && savedLoop?.data) {
        return <Redirect to={"/loops/edit/" + savedLoop.data.loop.id} />;
    }

    return (
        <Modal type={Modals.SAVE_LOOP} title="Save as">
            <form onSubmit={(event) => handleSubmit(event)}>
                <div className="modal__body">
                    <InputGroup>
                        <input
                            className="input input__text"
                            type="text"
                            maxLength={30}
                            value={loop.title}
                            onChange={(event) => handleNameChange(event)}
                        />
                    </InputGroup>
                </div>
                <footer className="modal__foot">
                    <button type="submit" className="button button--fill">
                        Save
                    </button>
                </footer>
            </form>
        </Modal>
    );
};

export default SaveLoopAsModal;

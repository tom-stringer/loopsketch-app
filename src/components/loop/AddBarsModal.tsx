import React, { FunctionComponent, useState } from "react";
import { useDispatch } from "react-redux";
import { Loop } from "../../types/loop-types";
import { addBars } from "../../redux/slices/loop-slice";
import { hideModal, Modals } from "../../redux/slices/modal-slice";
import InputGroup from "../input/InputGroup";
import Modal from "../modal/Modal";

type Props = {
    loop: Loop;
};

const AddBarsModal: FunctionComponent<Props> = ({ loop }) => {
    const dispatch = useDispatch();
    const [barCount, setBarCount] = useState(String(loop.barCount));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBarCount(event.target.value.replace(/\D/, ""));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(addBars({ id: loop.id, amount: Number(barCount) }));
        dispatch(hideModal());
    };

    return (
        <Modal type={Modals.ADD_BARS} title="Add bars">
            <div className="modal__body">
                <form onSubmit={(event) => handleSubmit(event)}>
                    <InputGroup>
                        <input
                            className="input input__text"
                            type="text"
                            value={barCount}
                            onChange={(event) => handleChange(event)}
                        />
                    </InputGroup>
                    <button className="button button--fill">Add bars</button>
                </form>
            </div>
        </Modal>
    );
};

export default AddBarsModal;

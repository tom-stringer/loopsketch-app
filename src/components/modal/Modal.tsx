import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideModal, Modals, selectCurrentModal } from "../../redux/slices/modal-slice";
import ModalHeader from "./ModalHeader";

type Props = {
    type: Modals;
    title?: string;
};

const Modal: FunctionComponent<Props> = ({ type, title, children }) => {
    const dispatch = useDispatch();
    const current = useSelector(selectCurrentModal);

    const close = () => {
        dispatch(hideModal());
    };

    if (current !== type) {
        return null;
    }

    return (
        <div>
            <div className="modal__background" onClick={() => close()} />

            <article className="modal">
                {title && <ModalHeader title={title} close={close} />}
                {children}
            </article>
        </div>
    );
};

export default Modal;

import React, { FunctionComponent } from "react";
import { Modals } from "../../redux/slices/modal-slice";
import Modal from "../modal/Modal";
import LoginForm from "./LoginForm";

const LoginModal: FunctionComponent = () => {
    return (
        <Modal type={Modals.LOG_IN} title="Log in">
            {/* {error && (
                <div className="alert__container">
                    <Alert type="error">{error.name}</Alert>
                </div>
            )} */}
            <LoginForm />
        </Modal>
    );
};

export default LoginModal;

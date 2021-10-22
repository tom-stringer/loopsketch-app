import React, { FunctionComponent } from "react";
import { Modals } from "../../redux/slices/modal-slice";
import Modal from "../modal/Modal";
import RegisterForm from "./RegisterForm";

const RegisterModal: FunctionComponent = () => {
    return (
        <Modal type={Modals.REGISTER} title="Register">
            {/* {error && (
                <div className="alert__container">
                    <Alert type="error">{error.name}</Alert>
                </div>
            )} */}
            <RegisterForm />
        </Modal>
    );
};

export default RegisterModal;

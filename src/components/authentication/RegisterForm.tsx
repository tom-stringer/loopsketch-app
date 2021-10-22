import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import InputGroup from "../input/InputGroup";
import { useRegisterMutation } from "../../redux/queries/authentication-queries";
import { hideModal } from "../../redux/slices/modal-slice";

const RegisterForm: FunctionComponent = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [file, setFile] = useState("");

    const [register, { isSuccess: isRegistered }] = useRegisterMutation();

    useEffect(() => {
        if (isRegistered) {
            dispatch(hideModal());
        }
    }, [isRegistered]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        register({ username, email, password1, password2 });
    };

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <div className="modal__body">
                <InputGroup label="Username">
                    <input
                        className="input input__text"
                        type="text"
                        maxLength={15}
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </InputGroup>

                <InputGroup label="Email">
                    <input
                        className="input input__text"
                        type="text"
                        maxLength={320}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </InputGroup>

                <InputGroup label="Password">
                    <input
                        className="input input__text"
                        type="password"
                        value={password1}
                        onChange={(event) => setPassword1(event.target.value)}
                    />
                </InputGroup>

                <InputGroup label="Repeat password">
                    <input
                        className="input input__text"
                        type="password"
                        value={password2}
                        onChange={(event) => setPassword2(event.target.value)}
                    />
                </InputGroup>
            </div>

            <footer className="modal__foot">
                <button type="submit" className="button button--fill">
                    Register
                </button>
            </footer>
        </form>
    );
};

export default RegisterForm;

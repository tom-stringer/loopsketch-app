import React, { FunctionComponent, useEffect, useState } from "react";
import InputGroup from "../input/InputGroup";
import PROPERTIES from "../../properties";
import { useLoginMutation } from "../../redux/queries/authentication-queries";
import { useDispatch } from "react-redux";
import { hideModal } from "../../redux/slices/modal-slice";

const LoginForm: FunctionComponent = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const [login, { isSuccess: isLoggedIn }] = useLoginMutation();

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(hideModal());
        }
    }, [isLoggedIn]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        login({ username, password });
    };

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <div className="modal__body">
                <InputGroup label="Username">
                    <input
                        className="input input__text"
                        type="text"
                        maxLength={PROPERTIES.USER.MAX_USERNAME_LENGTH}
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </InputGroup>

                <InputGroup label="Password">
                    <input
                        className="input input__text"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </InputGroup>
            </div>

            <footer className="modal__foot">
                <button type="submit" className="button button--fill">
                    Log in
                </button>
            </footer>
        </form>
    );
};

export default LoginForm;

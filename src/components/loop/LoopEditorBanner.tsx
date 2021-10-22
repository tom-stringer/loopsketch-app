import React, { FunctionComponent } from "react";
import { Loop } from "../../../../interface/src/types/loop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modals, showModal } from "../../redux/slices/modal-slice";
import { selectCurrentUser } from "../../redux/slices/authentication-slice";
import { useGetUserQuery } from "../../redux/queries/user-queries";

type Props = {
    loop: Loop;
};

const LoopEditor: FunctionComponent<Props> = ({ loop }) => {
    const dispatch = useDispatch();
    const { data: creator } = useGetUserQuery(loop.userId!, { skip: !loop.userId });
    const currentUser = useSelector(selectCurrentUser);

    const getSubtitle = () => {
        if (creator?.data) {
            return (
                <p className="banner__subtitle">
                    Created by <Link to={"/users/" + loop.userId}>{creator.data.user.username}</Link>
                </p>
            );
        } else if (currentUser) {
            return (
                <p className="banner__subtitle">
                    Unsaved loop by <Link to={"/users/" + loop.userId}>{currentUser.username}</Link>
                </p>
            );
        } else {
            return (
                <p className="banner__subtitle">
                    <button className="link" onClick={() => dispatch(showModal(Modals.LOG_IN))}>
                        Log in
                    </button>
                    {" or "}
                    <button className="link" onClick={() => dispatch(showModal(Modals.REGISTER))}>
                        register
                    </button>
                    {" to save loops"}
                </p>
            );
        }
    };

    return (
        <header className="banner">
            <h1 className="banner__title">{loop.title}</h1>
            {getSubtitle()}
        </header>
    );
};

export default LoopEditor;

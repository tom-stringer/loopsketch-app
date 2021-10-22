import React, { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modals, showModal } from "../../redux/slices/modal-slice";
import { selectShowMenu } from "../../redux/slices/nav-slice";
import { selectCurrentUser } from "../../redux/slices/authentication-slice";
import { useLogoutMutation } from "../../redux/queries/authentication-queries";

const NavMenu: FunctionComponent = () => {
    const dispatch = useDispatch();
    const showMenu = useSelector(selectShowMenu);
    const currentUser = useSelector(selectCurrentUser);

    const [logout] = useLogoutMutation();

    if (!showMenu) {
        return null;
    }

    const createLoopLink = (
        <Link to="/loops/edit" className="no-decoration">
            Create a loop
        </Link>
    );

    if (currentUser) {
        return (
            <div className="nav__menu">
                {createLoopLink}
                <Link to={"/users/" + currentUser.id} className="no-decoration">
                    Profile
                </Link>
                <button className="link link--no-decoration" onClick={() => logout()}>
                    Logout
                </button>
            </div>
        );
    } else {
        return (
            <div className="nav__menu">
                {createLoopLink}
                <button className="link link--no-decoration" onClick={() => dispatch(showModal(Modals.LOG_IN))}>
                    Log in
                </button>
                <button className="link link--no-decoration" onClick={() => dispatch(showModal(Modals.REGISTER))}>
                    Register
                </button>
            </div>
        );
    }
};

export default NavMenu;

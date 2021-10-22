import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PROPERTIES from "../../properties";
import { toggleMenu } from "../../redux/slices/nav-slice";

const NavBar: FunctionComponent = () => {
    const dispatch = useDispatch();

    return (
        <div className="nav__bar">
            <h1 className="nav__logo">
                <Link to="/" className="no-decoration">
                    {PROPERTIES.APP_NAME}
                </Link>
                <span className="nav__detail">.</span>
            </h1>

            <div onClick={() => dispatch(toggleMenu())} className="nav__toggle">
                <i className="fas fa-bars" />
            </div>
        </div>
    );
};

export default NavBar;

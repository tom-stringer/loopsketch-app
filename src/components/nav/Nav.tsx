import React, { FunctionComponent } from "react";
import LoginModal from "../authentication/LoginModal";
import RegisterModal from "../authentication/RegisterModal";
import NavBar from "./NavBar";
import NavMenu from "./NavMenu";

const Nav: FunctionComponent = () => {
    return (
        <div>
            <nav className="nav">
                <NavBar />
                <NavMenu />
            </nav>
            <div className="nav__margin"></div>
            <LoginModal />
            <RegisterModal />
        </div>
    );
};

export default Nav;

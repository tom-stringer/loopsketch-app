import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as ProfileSvg } from "../../../public/graphics/settings/031-profile.svg";

const EditProfileButton: FunctionComponent = () => {
    return (
        <div className="top-right">
            <Link to="/users/edit">
                <button className="button button--invisible">
                    <ProfileSvg className="svg svg__muted svg--1-25rem" />
                </button>
            </Link>
        </div>
    );
};

export default EditProfileButton;

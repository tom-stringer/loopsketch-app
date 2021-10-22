import React, { FunctionComponent } from "react";
import { User } from "../../../../interface/src/types/user-types";
import profilePic from "../../../public/images/profilepic.jpg";
import DateUtils from "../../utils/DateUtils";
import EditProfileButton from "./EditProfileButton";

type Props = {
    user: User;
};

const ProfileHeader: FunctionComponent<Props> = ({ user }) => {
    return (
        <header className="banner banner--fluid relative">
            <EditProfileButton />
            <div className="profile__header">
                <img className="profile__picture" src={profilePic} alt="profile" />
                <div className="profile__info">
                    <h1 className="banner__title">
                        {user.username}
                        <span className="primary">.</span>
                    </h1>
                    <div className="profile__follow-info">
                        <button className="button button--large">Follow</button>
                        <p>
                            <span className="bold">5 </span>followers
                            <span className="muted"> / </span>
                            <span className="bold">5 </span>following
                        </p>
                    </div>
                </div>
            </div>
            <p className="profile__bio">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
            </p>
            <p className="banner__footnote">Member since {DateUtils.getMonthAndYear(user.dateJoined)}</p>
        </header>
    );
};

export default ProfileHeader;

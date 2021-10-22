import React, { FunctionComponent } from "react";
import { User } from "../../../../interface/src/types/user-types";
import { Link } from "react-router-dom";

type Props = {
    user: User;
};

const ProfileEditor: FunctionComponent<Props> = ({ user }) => {
    return (
        <main className="profile-editor">
            <header className="banner banner--fluid">
                <h1 className="banner__title">
                    Edit <Link to={"/users/" + user.id}>{user.username}</Link>
                </h1>
            </header>
        </main>
    );
};

export default ProfileEditor;

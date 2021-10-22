import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/slices/authentication-slice";
import ProfileEditor from "../profile/ProfileEditor";

const EditProfilePage: FunctionComponent = () => {
    const currentUser = useSelector(selectCurrentUser);
    console.log(currentUser);

    if (currentUser) {
        return <ProfileEditor user={currentUser} />;
    } else {
        return null;
    }
};

export default EditProfilePage;

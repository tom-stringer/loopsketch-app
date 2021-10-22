import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, useParams } from "react-router-dom";
import { selectUsers } from "../../redux/slices/user-slice";
import Profile from "../profile/Profile";
import ParamUtils from "../../utils/ParamUtils";
import { useGetUserQuery } from "../../redux/queries/user-queries";

type Params = {
    userId: string;
};

const ProfilePage: FunctionComponent<RouteComponentProps<Params>> = () => {
    // Get ID from parameters.
    const params = useParams<Params>();
    const [isValidId, userId] = ParamUtils.validateId(params.userId);

    // Query for user.
    const { isSuccess } = useGetUserQuery(userId, { skip: !isValidId });
    const users = useSelector(selectUsers);
    const user = isSuccess ? users[userId] : undefined;

    if (isValidId) {
        if (user) {
            return <Profile user={user} />;
        } else {
            return <p>Loading</p>;
        }
    } else {
        return <p>Invalid ID</p>;
    }
};

export default ProfilePage;

import React, { FunctionComponent } from "react";
import { User } from "../../types/user-types";
import LoopPlayer from "../loop/LoopPlayer";
import ProfileHeader from "./ProfileHeader";
import { useGetLoopsByUserQuery } from "../../redux/queries/loop-queries";

type Props = {
    user: User;
};

const Profile: FunctionComponent<Props> = ({ user }) => {
    const { data } = useGetLoopsByUserQuery(user.id);
    const loopPlayers = data?.data?.loops.map((loop) => <LoopPlayer loop={loop} key={loop.id} />);

    return (
        <main className="profile">
            <ProfileHeader user={user} />
            <section className="content">
                <h1 className="content__title">Loops</h1>
                {loopPlayers ? loopPlayers : null}
            </section>
        </main>
    );
};

export default Profile;

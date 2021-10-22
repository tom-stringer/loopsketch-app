import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import LoopPlayer from "../loop/LoopPlayer";
import { useGetAllLoopsQuery } from "../../redux/queries/loop-queries";

const HomePage: FunctionComponent = () => {
    const { data } = useGetAllLoopsQuery();

    const loopPlayers = data?.data ? (
        Object.values(data.data.loops).map((loop) => <LoopPlayer loop={loop} key={loop.id} />)
    ) : (
        <p>Loading loops</p>
    );

    return (
        <main>
            <header className="banner banner--card">
                <p className="monospace muted italic">Get your musical ideas down in minutes</p>
                <h1 className="banner__title">
                    <Link to="/loops/edit">Create a loop.</Link>
                </h1>
            </header>
            <section className="content">
                <h1 className="content__title">Popular right now:</h1>
                {loopPlayers}
            </section>
        </main>
    );
};

export default HomePage;

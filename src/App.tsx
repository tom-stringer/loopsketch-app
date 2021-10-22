import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "./components/nav/Nav";
import HomePage from "./components/pages/HomePage";
import LoopEditorPageExisting from "./components/pages/LoopEditorPageExisting";
import ProfilePage from "./components/pages/ProfilePage";
import "./styles/styles.scss";
import EditProfilePage from "./components/pages/EditProfilePage";
import LoopEditorPageNew from "./components/pages/LoopEditorPageNew";
import { useGetAuthenticationStatusQuery } from "./redux/queries/authentication-queries";
import TestFileUploadForm from "./components/test/TestFileUploadForm";

export default function App() {
    // TODO change this crap
    // Should call for auth status in components that require current user information,
    // not at the App level
    useGetAuthenticationStatusQuery();

    return (
        <BrowserRouter>
            <Nav />
            <TestFileUploadForm />
            <Switch>
                <Route exact path="/users/edit" component={EditProfilePage} />
                <Route exact path="/users/:userId" component={ProfilePage} />
                <Route exact path="/loops/edit" component={LoopEditorPageNew} />
                <Route exact path="/loops/edit/:loopId" component={LoopEditorPageExisting} />
                <Route path="/" component={HomePage} />
            </Switch>
        </BrowserRouter>
    );
}

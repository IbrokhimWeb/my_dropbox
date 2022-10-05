// Import React and react-router-dom
import React from "react";
import { Route, Redirect } from "react-router-dom";

// Import Auth
import { useAuth } from "../../../contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()

    return (
        <Route {...rest}
            render={props => currentUser ? <Component {...props} /> : <Redirect to="/login" />}
        >
        </Route>
    )
}

// Import React
import React from "react";

// Import React Router Dom => 5.2.0
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Import Sigup
import Signup from "./components/authentication/Signup/Signup";

//Import AuthProvider
import { AuthProvider } from "./contexts/AuthContext";

// Import Components
import Profile from "./components/authentication/Profile/Profile";
import Login from "./components/authentication/Login/Login.jsx";
import PrivateRoute from "./components/authentication/PrivateRoute/PrivateRoute";
import ForgotPassword from "./components/authentication/ForgotPassword/ForgotPassword.jsx";
import UpdateProfile from "./components/authentication/UpdateProfile/UpdateProfile";
import Dashboard from "./components/google-drive/Dashboard/Dashboard";

// Import Bootstrap style
// import "bootstrap/dist/css/bootstrap.min.css";


function App() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    {/* Drive */}
                    <PrivateRoute exact path="/" component={Dashboard} />
                    <PrivateRoute exact path="/folder/:folderId" component={Dashboard} />

                    {/* Profile */}
                    <PrivateRoute path="/user" component={Profile} />
                    <PrivateRoute path="/update-profile" component={UpdateProfile} />

                    {/* Auth */}
                    <Route path="/signup" component={Signup} />
                    <Route path="/login" component={Login} />
                    <Route path="/forgot-password" component={ForgotPassword} />
                </Switch>
            </AuthProvider>
        </Router>
    )
}

export default App

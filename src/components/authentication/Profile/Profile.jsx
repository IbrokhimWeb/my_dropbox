//  Import React, React Hooks and react-router-dom
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Import Bootstrap Components
import { Card, Button, Alert } from "react-bootstrap";

//  Import Auth
import { useAuth } from "../../../contexts/AuthContext";

//  Import module css
import s from "./Profile.module.css"

// Import Components
import CenteredContainer from "../CenteredContainer/CenteredContainer.jsx";



export default function Profile() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError("")

        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <CenteredContainer>
            <Card className={s.card}>
                <Card.Body>
                    <h2 className={s.profile}>Profile</h2>
                    {
                        error && <Alert variant="danger">{error}</Alert>
                    }
                    <strong>Email:</strong> {currentUser.email}
                    <Link to="/update-profile" className={s.booton}>
                        Update Profile
                    </Link>
                </Card.Body>
                <div className={s.long__out}>
                    <Button className={s.button} variant="link" onClick={handleLogout}>
                        Log Out
                    </Button>
                </div>
            </Card>

        </CenteredContainer>
    )
}

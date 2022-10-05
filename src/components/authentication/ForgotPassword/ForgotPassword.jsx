//  Import React, React Hooks and react-router-dom
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

//  Import Bootstrap Components
import { Form, Button, Card, Alert } from "react-bootstrap";

//  Import Auth
import { useAuth } from "../../../contexts/AuthContext";

// Import Components
import CenteredContainer from "../CenteredContainer/CenteredContainer.jsx";

//  Import Module css
import s from "./ForgotPassword.module.css"



export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
        } catch {
            setError("Failed to reset password")
        }

        setLoading(false)
    }

    return (
        <CenteredContainer>
            <Card className={s.card}>
                <Card.Body>
                    <h2 className={s.resset__pasword}>Password Reset</h2>
                    {
                        error && <Alert variant="danger">{error}</Alert>
                    }
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control className={s.email} type="email" ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className={s.booton} type="submit">
                            Reset Password
                        </Button>
                    </Form>
                    <div className={s.login}>
                        <Link className={s.log__in} to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className={s.signup}>
                Need an account? <Link className={s.sign__up} to="/signup">Sign Up</Link>
            </div>
        </CenteredContainer>
    )
}

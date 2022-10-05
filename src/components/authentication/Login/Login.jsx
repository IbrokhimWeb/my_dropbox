//Import React, React Hooks and react-router-dom
import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

//  Import Bootstrap Components
import { Form, Button, Card, Alert } from "react-bootstrap";

//  Import Ayth
import { useAuth } from "../../../contexts/AuthContext";

// Import Module css
import s from "./Login.module.css"

//  Import Components
import CenteredContainer from "../CenteredContainer/CenteredContainer.jsx";

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to log in!!!")
        }

        setLoading(false)
    }

    return (
        <CenteredContainer>
            <Card>
                <Card.Body className={s.card}>
                    <h2 className={s.login}>Log In!</h2>
                    {
                        error && <Alert variant="danger">{error}</Alert>
                    }
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control className={s.email} type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className={s.password} type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Button className={s.booton} disabled={loading} type="submit">
                            Log In
                        </Button>
                    </Form>
                    <div className={s.forgot}>
                        <Link className={s.forgot} to="/forgot-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className={s.sign__up}>
                Need an account? <Link className={s.signup} to="/signup">Sign Up!</Link>
            </div>
        </CenteredContainer>
    )
}

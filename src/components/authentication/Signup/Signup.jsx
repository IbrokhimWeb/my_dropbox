// Import React, React Hooks and react-router-dom
import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

//  Import Bootstrap Components
import { Form, Button, Card, Alert } from "react-bootstrap";

//  Import Auth
import { useAuth } from "../../../contexts/AuthContext";

// Import module css
import s from "./Signup.module.css"

//  Import Components
import CenteredContainer from "../CenteredContainer/CenteredContainer.jsx";





export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to create an account")
        }

        setLoading(false)
    }

    return (
        <CenteredContainer>
            <Card className={s.card}>
                <Card.Body>
                    <h2 className={s.signUp}>Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control className={s.email} type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className={s.password} type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control className={s.password} type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button className={s.button} disabled={loading}  type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className={s.log__in}>
                Already have an account? <Link className={s.logIn} to="/login">Log In</Link>
            </div>
        </CenteredContainer>
    )
}

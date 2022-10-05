// Import React, React Hooks and React-router-dom
import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"

//  Import React-Bootstrap
import { Form, Button, Card, Alert } from "react-bootstrap"

//  Import Auth
import { useAuth } from "../../../contexts/AuthContext"

// Import module css
import s from "./UpdateProfile.module.css"

//  Import Components
import CenteredContainer from "../CenteredContainer/CenteredContainer.jsx"


export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises)
            .then(() => {
                history.push("/user")
            })
            .catch(() => {
                setError("Failed to update account")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <CenteredContainer>
            <Card className={s.card}>
                <Card.Body>
                    <h2 className={s.update}>Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                className={s.email}
                                type="email"
                                ref={emailRef}
                                required
                                defaultValue={currentUser.email}
                            />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                className={s.password}
                                type="password"
                                ref={passwordRef}
                                placeholder="Leave blank to keep the same"
                            />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control
                                className={s.password}
                                type="password"
                                ref={passwordConfirmRef}
                                placeholder="Leave blank to keep the same"
                            />
                        </Form.Group>
                        <Button disabled={loading} className={s.booton} type="submit">
                            Update
                        </Button>
                    </Form>
                </Card.Body>
                <div className={s.btnn}>
                    <Link className={s.button} to="/user">Cancel</Link>
                </div>
            </Card>

        </CenteredContainer>
    )
}

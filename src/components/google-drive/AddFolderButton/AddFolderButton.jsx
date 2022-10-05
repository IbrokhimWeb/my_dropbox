//  Import React and react Hooks
import React, { useState } from "react";

//  Import Bookstrap Components
import { Button, Modal, Form } from "react-bootstrap";

//  Import Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

// Import DB
import { database } from "../../../firebase";

//  Import Auth
import { useAuth } from "../../../contexts/AuthContext";

//  Import FOLDER
import { ROOT_FOLDER } from "../../../hooks/useFolder";

//  Import modul css
import s from "./AddFolderButton.module.css"

// import "bootstrap/dist/css/bootstrap.min.css"


export default function AddFolderButton({ currentFolder }) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const { currentUser } = useAuth()

    function openModal() {
        setOpen(true)
    }

    function closeModal() {
        setOpen(false)
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (currentFolder == null) return

        const path = [...currentFolder.path]
        if (currentFolder !== ROOT_FOLDER) {
            path.push({ name: currentFolder.name, id: currentFolder.id })
        }

        database.folders.add({
            name: name,
            parentId: currentFolder.id,
            userId: currentUser.uid,
            path: path,
            createdAt: database.getCurrentTimestamp(),
        })
        setName("")
        closeModal()
    }

    return (
        <>
            <Button className={s.button} onClick={openModal} variant="outline-success" size="sm">
                <FontAwesomeIcon
                    icon={faFolderPlus}
                    className={s.icon}
                />
            </Button>
            <Modal className={s.modal} show={open} onHide={closeModal}>
                <Form className={s.modal__block} onSubmit={handleSubmit}>
                    <div className={s.block}>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>Folder Name</Form.Label>
                                <Form.Control
                                className={s.input}
                                    type="text"
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className={s.close} variant="secondary" onClick={closeModal}>
                                Close
                            </Button>
                            <Button className={s.add} variant="success" type="submit">
                                Add Folder
                            </Button>
                        </Modal.Footer>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

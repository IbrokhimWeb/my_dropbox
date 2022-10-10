//  Import React, React-router-dom and React Hooks
import React, { useState } from "react";
import ReactDOM from "react-dom";

//  Import Font Awesom Icons
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//  Import React-bootstrap
import { ProgressBar, Toast } from "react-bootstrap";

//  Import FOLDER, Auth and uuid 
import { ROOT_FOLDER } from "../../../hooks/useFolder";
import { useAuth } from "../../../contexts/AuthContext";
import { v4 as uuidV4 } from "uuid";

// Import module.css
import s from "./AddFileButton.module.css"

//  Import Components
import { storage, database } from "../../../firebase";



export default function AddFileButton({ currentFolder }) {
    const [uploadingFiles, setUploadingFiles] = useState([])
    const { currentUser } = useAuth()

    function handleUpload(e) {
        const file = e.target.files[0];
        if (currentFolder == null || file == null) return

        const id = uuidV4()
        setUploadingFiles(prevUploadingFiles => [
            ...prevUploadingFiles,
            { id: id, name: file.name, progress: 0, error: false },
        ])
        const filePath =
            currentFolder === ROOT_FOLDER
                ? `${currentFolder.path.join("/")}/${file.name}`
                : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`

        

        const uploadTask = storage
            .ref(`/files/${currentUser.uid}/${filePath}`)
            .put(file)

        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = snapshot.bytesTransferred / snapshot.totalBytes
                setUploadingFiles(prevUploadingFiles => {
                    return prevUploadingFiles.map(uploadFile => {
                        if (uploadFile.id === id) {
                            return { ...uploadFile, progress: progress }
                        }

                        return uploadFile
                    })
                })
            },
            () => {
                setUploadingFiles(prevUploadingFiles => {
                    return prevUploadingFiles.map(uploadFile => {
                        if (uploadFile.id === id) {
                            return { ...uploadFile, error: true }
                        }
                        return uploadFile
                    })
                })
            },
            () => {
                setUploadingFiles(prevUploadingFiles => {
                    return prevUploadingFiles.filter(uploadFile => {
                        return uploadFile.id !== id
                    })
                })

                uploadTask.snapshot.ref.getDownloadURL().then(url => {
                    database.files
                        .where("name", "==", file.name)
                        .where("userId", "==", currentUser.uid)
                        .where("folderId", "==", currentFolder.id)
                        .get()
                        .then(existingFiles => {
                            const existingFile = existingFiles.docs[0]
                            console.log(existingFile)
                            if (existingFile?.exists) {
                                existingFile.ref.update({ url: url })
                            } else {
                                database.files.add({
                                    url: url,
                                    name: file.name,
                                    createdAt: database.getCurrentTimestamp(),
                                    folderId: currentFolder.id,
                                    userId: currentUser.uid,
                                })
                            }
                            setUploadingFiles([])
                        })
                })
            }
        )
    }

    return (
        <>
            <label className={s.file} style={{ color: "#3498DB" }}>
                <FontAwesomeIcon className={s.icon} icon={faFileUpload} style={{ fontSize: 35 }} />
                <input
                    type="file"
                    onChange={handleUpload}
                    style={{ opacity: 0, position: "absolute", left: "-9999px" }}
                />
            </label>
            {uploadingFiles.length > 0 &&
                ReactDOM.createPortal(
                    <div className={s.upload}>
                        {uploadingFiles.map(file => (
                            <Toast
                                key={file.id}
                                onClose={() => {
                                    setUploadingFiles(prevUploadingFiles => {
                                        return prevUploadingFiles.filter(uploadFile => {
                                            return uploadFile.id !== file.id
                                        })
                                    })
                                }}
                            >
                                <Toast.Header
                                    closeButton={file.error}
                                    className={s.hidden}
                                >
                                    {file.name}
                                </Toast.Header>
                                <Toast.Body>
                                    <ProgressBar
                                        animated={!file.error}
                                        className={file.error ? s.error : s.sucses}
                                        now={file.error ? 100 : file.progress * 100}
                                        label={
                                            file.error
                                                ? "Error"
                                                : `${Math.round(file.progress * 100)}%`
                                        }
                                    />
                                </Toast.Body>
                            </Toast>
                        ))}
                    </div>,
                    document.body
                )}
        </>
    )
}

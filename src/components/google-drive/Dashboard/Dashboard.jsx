//  Import React and react-router-dom...
import React from "react";
import { useParams, useLocation } from "react-router-dom";

//  Import Bootstrap Components
import { Container } from "react-bootstrap";

// Import Folder
import { useFolder } from "../../../hooks/useFolder";

//  Import Module css
import s from "./Dashboard.module.css"


// Import Components
import AddFolderButton from "../AddFolderButton/AddFolderButton";
import AddFileButton from "../AddFileButton/AddFileButton";
import Folder from "../Folder/Folder";
import File from "../File/File";
import Navbar from "../Navbar/Navbar";
import FolderBreadcrumbs from "../FolderBreadcrumbs/FolderBreadcrumbs";

export default function Dashboard() {
    const { folderId } = useParams()
    const { state = {} } = useLocation()
    const { folder, childFolders, childFiles } = useFolder(folderId, state.folder)

    return (
        <>
            <Navbar />
            <Container fluid>
                <div className={s.block}>
                    <FolderBreadcrumbs currentFolder={folder} />
                    <div>
                        <AddFileButton currentFolder={folder} />
                        <AddFolderButton currentFolder={folder} />
                    </div>
                </div>
                {childFolders.length > 0 && (
                    <div >
                        {childFolders.map(childFolder => (
                            <div
                                key={childFolder.id}
                                style={{ padding: '20px' }}
                            >
                                <Folder folder={childFolder} />
                            </div>
                        ))}
                    </div>
                )}
                {childFolders.length > 0 && childFiles.length > 0 && <hr />}
                {childFiles.length > 0 && (
                    <div>
                        {childFiles.map(childFile => (
                            <div
                                key={childFile.id}
                                style={{  padding: '20px' }}
                            >
                                <File file={childFile} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </>
    )
}

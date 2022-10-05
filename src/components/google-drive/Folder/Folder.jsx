//  Import React
import React from "react";

//  Import Link
import { Link } from "react-router-dom";

//  Import Bootstrap components
import { Button } from "react-bootstrap";

//  Import Fort Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

//  Import bootstrap
import s from "./Folder.module.css";

export default function Folder({ folder }) {
    return (
        <Button
            to={{
                pathname: `/folder/${folder.id}`,
                state: { folder: folder },
            }}
            variant="outline-dark"
            className={s.folder}
            as={Link}
        >
            <FontAwesomeIcon  icon={faFolder} className={s.icon} />
            <p className={s.text}>{folder.name}</p>
        </Button>
    )
}

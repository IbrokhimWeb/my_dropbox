//  Import React
import React from "react";

//  Import module css
import s from "./File.module.css"

//  Import Font Awesom Icons
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function File({ file }) {
    return (
        <a
            href={file.url}
            className={s.file}
        >
            <FontAwesomeIcon icon={faFile} className={s.icon} />
            <p className={s.text}>{file.name}</p>
        </a>
    )
}

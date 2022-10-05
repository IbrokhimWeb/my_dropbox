// Import React and React-router-dom
import React from "react";

// Import Bootstrap Components
import { Container } from "react-bootstrap";

//  Import module css
import s from "./CenteredContainer.module.css"



export default function CenteredContainer({ children }) {
  return (
    <Container className={s.container}>
      <div className={s.content}>{children}</div>
    </Container>
  )
}

import * as React from "react"
import styled from "styled-components"
import getValue from "get-value"

const getBackground = (props) => {
  const isPrimary = props.which === "primary"
  const isPrimaryDisabled = isPrimary && props.disabled

  return (
    (isPrimaryDisabled && "var(--darkGreen75)") ||
    (isPrimary && "var(--brandGreen)") ||
    "var(--white)"
  )
}

export const Button = styled.button`
  color: ${(props) =>
    props.which === "primary" ? "var(--offWhite)" : "var(--deepGreen)"};
  background: ${getBackground};

  border: 1px solid
    ${(props) => (props.which === "primary" ? "var(--darkBrandGreen)" : "#446264")};
  padding: 8px 16px 10px;
  font-size: 16px;
  font-weight: 700;
  display: inline-flex;
  justify-content: center;
  cursor: pointer;

  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`

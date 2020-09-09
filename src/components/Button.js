import * as React from "react"
import styled, { css } from "styled-components"
import getValue from "get-value"

const disabledStyles = css`
  background: ${(props) => props.theme.disabledButtonBackgroundColor};
  color: ${(props) => props.theme.disabledButtonTextColor};
  border: ${(props) => props.theme.disabledButtonBorder};
  font-weight: ${(props) => props.theme.disabledButtonFontWeight};
  cursor: not-allowed;

  &:hover {
    background: ${(props) => props.theme.disabledButtonBackgroundColor};
    color: ${(props) => props.theme.disabledButtonTextColor};
    border: ${(props) => props.theme.disabledButtonBorder};
  }
`

const primaryStyles = css`
  background: ${(props) => props.theme.primaryButtonBackgroundColor};
  color: ${(props) => props.theme.primaryButtonTextColor};
  border: ${(props) => props.theme.primaryButtonBorder};
  font-weight: ${(props) => props.theme.primaryButtonFontWeight};

  &:hover {
    background: ${(props) => props.theme.primaryButtonHoveredBackgroundColor};
    color: ${(props) => props.theme.primaryButtonHoveredTextColor};
    border: ${(props) => props.theme.primaryButtonHoveredBorder};
  }
`

const secondaryStyles = css`
  background: ${(props) => props.theme.secondaryButtonBackgroundColor};
  color: ${(props) => props.theme.secondaryButtonTextColor};
  border: ${(props) => props.theme.secondaryButtonBorder};

  &:hover {
    background: ${(props) => props.theme.secondaryButtonBackgroundColor};
    color: ${(props) => props.theme.secondaryButtonTextColor};
    border: ${(props) => props.theme.secondaryButtonBorder};
  }
`

export const Button = styled.button`
  cursor: pointer;
  user-select: none;
  padding: 10px 16px 10px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 2px;
  display: inline-flex;
  justify-content: center;
  text-transform: uppercase;

  ${(props) => props.isSecondary && secondaryStyles};
  ${(props) => props.isPrimary && primaryStyles};
  ${(props) => props.isDisabled && disabledStyles};
`

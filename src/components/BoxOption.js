import * as React from "react"
import styled from "styled-components"
import { Button } from "./Button"
import { Link, Route } from "wouter"

export const BoxOption = (props) => {
  return (
    <BoxOptionContainer>
      <BoxOptionTitle>{props.title}</BoxOptionTitle>
      <BoxOptionDescription>{props.description}</BoxOptionDescription>
      <Link className='BoxOptionButton' href='/box-product-selection'>
        <Button className='optionButton' onClick={props.onSelect}>
          Select This Box
        </Button>
      </Link>
    </BoxOptionContainer>
  )
}

const BoxOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #446264;
  background: var(--white);
  padding: 24px;
  align-items: flex-start;

  .optionButton {
    margin-top: 16px;
  }

  @media screen and (max-width: 530px) {
    .BoxOptionButton {
      width: 100%;
    }
  }
`

const BoxOptionTitle = styled.h3`
  font-weight: 700;
  font-size: 18px;
`

const BoxOptionDescription = styled.p`
  margin-bottom: 16px;
  margin-bottom: auto;
`

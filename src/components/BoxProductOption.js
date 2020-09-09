import * as React from "react"
import styled from "styled-components"
import { Button } from "./Button"
import { useBoxStore, useSharedStore } from "../stores"
import { Store } from "../../store"

export const BoxProductOption = (props) => {
  return (
    <BoxProductOptionContainer>
      <BoxProductOptionTop imageSrc={props.product.media[0].src}></BoxProductOptionTop>
      <BoxProductOptionBottom>
        <BoxProductOptionTitle>{props.product.title}</BoxProductOptionTitle>
        <p className='quickViewLink' onClick={() => props.toggleIsQuickViewOpen(true)}>
          Quick View
        </p>
        {props.hasProduct ? (
          <div className='quantityChanger'>
            <Button
              className='decrementButton'
              onClick={(event) => {
                event.preventDefault()
                props.removeProductFromBox()
              }}
              children={
                <img
                  className='quantityIcon'
                  src={window.pedersonsData.assets.minusIconUrl}
                  alt='decrement'
                />
              }
            ></Button>
            <p className='quantityText'>{props.quantity}</p>
            <Button
              className={`incrementButton ${props.isBoxFull ? "nope" : ""}`}
              onClick={(event) => {
                event.preventDefault()
                props.addProductToBox()
              }}
              children={
                <img
                  className='quantityIcon'
                  src={window.pedersonsData.assets.plusIconUrl}
                  alt='increment'
                />
              }
            ></Button>
          </div>
        ) : props.isBoxFull ? (
          <Button isDisabled className='BoxProductOptionButton'>
            Box Is Full
          </Button>
        ) : (
          <Button
            isPrimary
            className='BoxProductOptionButton'
            onClick={(event) => {
              event.preventDefault()
              props.addProductToBox()
            }}
          >
            Add To Box
          </Button>
        )}
      </BoxProductOptionBottom>
    </BoxProductOptionContainer>
  )
}

const BoxProductOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: var(--white);

  .quantityChanger {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;

    .quantityIcon {
      max-width: 20px;
    }

    .decrementButton {
      border: none;
      height: 40px;
      width: 40px;
      padding-top: 9px;
      background: var(--darkGreen10);
    }

    .quantityText {
      font-size: 18px;
      text-align: center;
      width: 100%;
      background: var(--brandOffWhite100);
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .incrementButton {
      border: none;
      height: 40px;
      width: 40px;
      padding-top: 9px;
      background: var(--darkGreen10);
    }

    .incrementButton.nope {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .BoxProductOptionButton {
    width: 100%;
  }

  .BoxProductOptionButton[disabled] {
    cursor: not-allowed;
  }

  .BoxProductOptionButton:first-of-type {
    margin-top: 16px;
  }

  /* @media screen and (max-width: 530px) {
    .BoxProductOptionButton {
      width: 100%;
    }
  } */
`

const BoxProductOptionTop = styled.div`
  position: relative;
  background: url(${(props) => props.imageSrc});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  padding-top: 50%;

  @media (min-width: 530px) {
    padding-top: 60%;
  }
`

const BoxProductOptionBottom = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 0px 0px;
  width: 100%;

  .quickViewLink {
    cursor: pointer;
    font-size: 16px;
    color: var(--brandGreen100);
    font-style: italic;

    :hover {
      color: var(--brandDarkGreen100);
    }
  }

  @media screen and (min-width: 530px) {
    .quickViewLink {
      font-size: 14px;
    }
  }
`

const BoxProductOptionTitle = styled.h3`
  font-weight: 700;
  font-size: 18px;
  color: var(--brandDarkGreen100);
  margin-bottom: 16px;
  /* text-shadow: 0px 2px #000; */
`

const BoxProductOptionImage = styled.img`
  margin-bottom: 8px;
  max-width: 100%;
`

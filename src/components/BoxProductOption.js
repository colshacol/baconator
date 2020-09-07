import * as React from "react"
import styled from "styled-components"
import { Button } from "./Button"
import { useBoxStore, useSharedStore } from "../stores"

export const BoxProductOption = (props) => {
  const boxStore = useBoxStore()
  const sharedStore = useSharedStore()

  return (
    <BoxProductOptionContainer>
      <BoxProductOptionTop imageSrc={props.media[0].src}></BoxProductOptionTop>
      <BoxProductOptionBottom>
        <BoxProductOptionTitle>{props.title}</BoxProductOptionTitle>
        <p
          className='quickViewLink'
          onClick={() => sharedStore.openProductQuickView(props)}
        >
          Quick View
        </p>
        {boxStore.hasProduct(props.id) ? (
          <div className='quantityChanger'>
            <Button
              className='decrementButton'
              onClick={(event) => {
                event.preventDefault()
                boxStore.removeProduct(props.id)
              }}
              children={
                <img
                  className='quantityIcon'
                  src={window.pedersonsData.assets.minusIconUrl}
                  alt='decrement'
                />
              }
            ></Button>
            <p className='quantityText'>{boxStore.getProductCount(props.id)}</p>
            <Button
              className={`incrementButton ${boxStore.isBoxFull() ? "nope" : ""}`}
              onClick={(event) => {
                event.preventDefault()
                boxStore.addProduct(props.id)
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
        ) : boxStore.isBoxFull() ? (
          <Button
            isDisabled
            className='BoxProductOptionButton'
            onClick={(event) => {
              event.preventDefault()
              // boxStore.addProduct(props.id)
            }}
          >
            Box Is Full
          </Button>
        ) : (
          <Button
            isPrimary
            className='BoxProductOptionButton'
            onClick={(event) => {
              event.preventDefault()
              boxStore.addProduct(props.id)
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

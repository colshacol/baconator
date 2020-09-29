import { motion } from "framer-motion"
import * as React from "react"
import styled from "styled-components"
import { useBoxState } from "../useBoxState"
import { Button } from "./Button"

const QuickViewLink = () => {
  return (
    <div className='quickViewLink'>
      <img src={window.pedersonsData.assets.searchIconWhiteUrl} alt='search icon' />
    </div>
  )
}

const QuantityWeightAndPricing = (props) => {
  return (
    <div className='productInfo'>
      <div
        className='productQuantityWeight'
        dangerouslySetInnerHTML={{
          __html: props.innerHtml || "<span></span>",
        }}
      ></div>
    </div>
  )
}

const variants = {
  hidden: { opacity: 0 },
  visible: (custom) => {
    const final = { opacity: 1, transition: { duration: 1, delay: 0.3 * custom } }
    return final
  },
}

export const BoxProductOption = (props) => {
  const state = useBoxState()
  // const title = props.product.title.slice(0, props.product.title.indexOf("("))

  return (
    <BoxProductOptionContainer variants={variants} custom={props.index} initial='hidden' animate='visible'>
      <BoxProductOptionTop
        imageSrc={props.product && props.product.media && props.product.media[0].src}
        onClick={props.toggleIsQuickViewOpen}
      >
        <QuickViewLink />
      </BoxProductOptionTop>
      <BoxProductOptionBottom>
        <BoxProductOptionTitle>{props.product.titleWithoutPackageQuantity}</BoxProductOptionTitle>
        <QuantityWeightAndPricing innerHtml={props.product.metaFields.quantity_weight_and_pricing} />

        {props.product.isOutOfStock && (
          <Button isDisabled className='BoxProductOptionButton'>
            Out of Stock
          </Button>
        )}

        {!!props.product.metaFields.in_stores_only && (
          <Button
            className='FindRetailerButton'
            onClick={(event) => {
              window.location.assign("https://pedersonsfarms.com/find")
            }}
          >
            FIND A RETAILER
          </Button>
        )}

        {!!props.product.isOutOfStock || !!props.product.metaFields.in_stores_only ? null : props.hasProduct ? (
          <div className='quantityChanger'>
            <Button
              className='decrementButton'
              onClick={(event) => {
                event.preventDefault()
                state.removeItem(props.product.id)
              }}
            >
              <img className='quantityIcon' src={window.pedersonsData.assets.minusIconUrl} alt='decrement' />
            </Button>
            <p className='quantityText'>{props.quantity}</p>
            <Button
              className={`incrementButton`}
              onClick={(event) => {
                event.preventDefault()
                state.addItem(props.product.id)
              }}
            >
              <img className='quantityIcon' src={window.pedersonsData.assets.plusIconUrl} alt='increment' />
            </Button>
          </div>
        ) : (
          <Button
            isPrimary
            className='BoxProductOptionButton'
            onClick={(event) => {
              event.preventDefault()
              state.addItem(props.product.id)
            }}
          >
            Add To Box
          </Button>
        )}
      </BoxProductOptionBottom>
    </BoxProductOptionContainer>
  )
}

const BoxProductOptionContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: var(--white);

  .productInfo {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    color: var(--brandBlack50);
    /* align-items: center; */
  }

  .productQuantityWeight {
    font-size: 14px;
  }

  .fromPrice {
    font-weight: 700;
    margin-bottom: 16px;
  }

  :hover {
    .quickViewLink {
      transform: scale(1.2);
      background: var(--brandGreen80);
      box-shadow: 0px 2px 16px var(--brandBlack50);
    }
  }

  .quantityChanger {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* margin-top: 16px; */

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
`

const BoxProductOptionTop = styled.div`
  /* position: relative; */
  background: url(${(props) => props.imageSrc});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  padding-top: 100%;

  @media (min-width: 530px) {
    padding-top: 100%;
  }

  .quickViewLink {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    cursor: pointer;
    position: relative;
    bottom: 8px;
    left: 16px;
    background: var(--brandBlack30);
    transition: all 0.2s;
    width: 40px;
    height: 40px;
    transform: scale(1);

    img {
      margin: 0 1px 0px 0px;
      max-width: 32px;
    }
  }
`

const BoxProductOptionBottom = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 0px 0px;
  width: 100%;
  position: relative;
`

const BoxProductOptionTitle = styled.h3`
  font-weight: 700;
  font-size: 18px;
  color: var(--brandDarkGreen100);
  margin-bottom: 8px;
  /* text-shadow: 0px 2px #000; */
`

const BoxProductOptionImage = styled.img`
  margin-bottom: 8px;
  max-width: 100%;
`

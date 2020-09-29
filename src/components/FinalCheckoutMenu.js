import wretch from "wretch"
import * as React from "react"
import { slide as Menu } from "react-burger-menu"
import "react-image-gallery/styles/css/image-gallery.css"
import "regenerator-runtime/runtime"
import styled from "styled-components"
import { Button } from "./Button"
import { useBoxState } from "../useBoxState"
import { useScript } from "../utilities/useScript"
import useBoolean from "react-hanger/useBoolean"

const useRechargeScript = () => {
  const status = useScript(window.pedersonsData.assets.rechargeScriptUrl)

  React.useEffect(() => {
    status === "ready" && window.reChargeCartJS()
  }, [status === "ready"])
}

const createUrl = (code, totalPrice, itemCount) => {
  return `https://pnf-services.tasteink.com/api/mergeDiscounts?discountCode=${code}&totalPrice=${totalPrice}&itemCount=${itemCount}`
}

const useDiscountCalculator = (store) => {
  const timeout = React.useRef()
  const [userCode, setUserCode] = React.useState("")
  const [codeInputValue, setCodeInputValue] = React.useState("")
  const quantityCode = `BOX-OF-${store.boxQuantityCount}`
  const masterCode = userCode || quantityCode

  // empty, dirty, validating, valid, invalid
  const [validState, setValidState] = React.useState("empty")

  // React.useEffect(() => {
  //   setValidState("dirty")
  // }, [codeInputValue])

  const setCodeValue = (event) => {
    setCodeInputValue(event.target.value)
    setValidState("dirty")
  }

  const handleDiscountCode = () => {
    setValidState("validating")
    const totalPrice = store.cartPrice
    const itemCount = store.boxQuantityCount
    const url = createUrl(codeInputValue, totalPrice, itemCount)
    const headers = { "Content-Type": "application/json" }

    return wretch(url)
      .headers(headers)
      .get()
      .json((data) => {
        console.log("pnf-services/mergeDiscounts: ", data)
        // data.message === "SUCCESS" && setUserCode(data.discount.code)
        data.type === "success" && setValidState("valid")
      })
  }

  React.useEffect(() => {
    // whenever the user types in the discount code input, if
    // there is more than one product, the user has entered a code,
    // and the checkout is open, we want to validate the entered
    // code and also set getDiscountedUrl for ReCharge to use.
    if (store.boxQuantityCount > 1 && codeInputValue && store.isCheckoutOpen) {
      window.getDiscountedUrl = (checkoutUrl) => {
        const moreThanOneProduct = store.boxQuantityCount > 1
        const discountUrl = `${checkoutUrl}&discount=${masterCode}`
        return moreThanOneProduct ? discountUrl : checkoutUrl
      }

      timeout.current && clearTimeout(timeout.current)
      timeout.current = setTimeout(handleDiscountCode, 750)
    }
  }, [store.isCheckoutOpen, codeInputValue])

  return {
    codeInputValue,
    validState,
    setCodeValue,
  }
}

export const FinalCheckoutMenu = () => {
  useRechargeScript()
  const state = useBoxState()
  const [discountCodeInputValue, setDiscountCodeInputValue] = React.useState("")

  const isValidDiscountCode = state.rechargeDiscounts.find((discount) => {
    return discount.code.toLowerCase() === discountCodeInputValue.toLowerCase()
  })

  React.useEffect(() => {
    if (isValidDiscountCode) {
      const code = isValidDiscountCode.code + `-BOX-OF-${state.boxQuantityCount}`
      const value = isValidDiscountCode.value + (state.boxQuantityCount - 1) * 20

      const match = state.rechargeDiscounts.find((discount) => {
        return discount.code.toLowerCase() === code.toLowerCase()
      })

      match && console.log("matched!", { code, value, match })

      if (!match) {
        const url = "https://pnf-services.tasteink.com/api/createDiscount"
        const headers = { "Content-Type": "application/json" }
        const body = { code, value, ...isValidDiscountCode }
        wretch(url)
          .headers(headers)
          .post(body)
          .json((discount) => {
            console.log("CREATE DISCOUNT RESPONSE", discount)
            state.getRechargeDiscounts()
          })
      }

      window.getDiscountedUrl = (checkoutUrl) => {
        const moreThanOneProduct = state.boxQuantityCount > 1
        const discountUrl = `${checkoutUrl}&discount=${code}`
        console.log({ moreThanOneProduct, discountUrl })
        return moreThanOneProduct ? discountUrl : checkoutUrl
      }
    } else {
      window.getDiscountedUrl = (checkoutUrl) => {
        const moreThanOneProduct = state.boxQuantityCount > 1
        const discountUrl = `${checkoutUrl}&discount=BOX-OF-${state.boxQuantityCount}`
        console.log({ moreThanOneProduct, discountUrl })
        return moreThanOneProduct ? discountUrl : checkoutUrl
      }
    }
  })

  return (
    <StyledMenu
      right
      className='CheckoutModal'
      isOpen={state.isCheckoutOpen}
      onOpen={() => state.setIsCheckoutOpen(true)}
      onClose={() => state.setIsCheckoutOpen(false)}
    >
      <>
        <div className='pnf-input-container'>
          <label className='pnf-input-label'>Discount Code</label>
          <input
            className='pnf-input'
            placeholder='discount code'
            value={discountCodeInputValue}
            onChange={(e) => setDiscountCodeInputValue(e.target.value)}
          />
        </div>

        <p className='discountMessage' style={{ opacity: discountCodeInputValue ? 1 : 0.5 }}>
          {isValidDiscountCode && "Look's good!"}
          {discountCodeInputValue && !isValidDiscountCode && "That code is not valid."}
        </p>

        <CheckoutButton isDisabled={discountCodeInputValue && !isValidDiscountCode} />
        <p className='otherText' style={{ fontSize: 14 }}>
          Pause or cancel your subscription at any time.
        </p>

        <p className='acknowledgementText'>
          By clicking CHECKOUT above, I acknowledge that all items I will receive are frozen items - frozen from
          the day of packaging. Use By/Freeze By dates are or may be on packages. This date only represents the
          day that an item should be used or frozen by if the product has never been frozen before. It is the
          recommendation that all perishable items received from Pederson's Farms remain frozen until use. After
          thawing of all items, it is recommended that they are cooked thoroughly within 5 days.
        </p>
      </>
    </StyledMenu>
  )
}

const StyledMenu = styled(Menu)`
  background: #fff;
  width: 80%;
  max-width: 500px;

  .discountMessage {
    transition: opacity 0.3s;
    margin-bottom: 8px;
  }

  .otherText {
    margin-top: 8px;
    height: 23px;
  }

  .acknowledgementText {
    margin-top: 24px;
    font-size: 13px;
    color: var(--brandGray80);
  }

  .pnf-input-container {
    margin-bottom: 8px;
  }
`

const CheckoutButton = (props) => {
  return (
    <Button
      isPrimary={!props.isDisabled}
      isDisabled={props.isDisabled}
      style={{ width: "100%" }}
      name='checkout'
      className='checkout_button'
    >
      Checkout
    </Button>
  )
}

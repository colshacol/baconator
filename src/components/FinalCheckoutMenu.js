import wretch from "wretch"
import * as React from "react"
import { slide as Menu } from "react-burger-menu"
import "react-image-gallery/styles/css/image-gallery.css"
import "regenerator-runtime/runtime"
import styled from "styled-components"
import { Button } from "./Button"
import { useBoxState } from "../useBoxState"
import { useScript } from "../utilities/useScript"

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

const useDiscount = (state, inputValue) => {
  const rootCode = inputValue ? `${inputValue}-` : ""
  const fullCode = `${rootCode}BOX-OF-${state.boxQuantityCount}`
  const matchingDiscount = state.getMatchingDiscountCode(fullCode)
  return matchingDiscount
}

export const FinalCheckoutMenu = () => {
  useRechargeScript()
  const state = useBoxState()
  const timeout = React.useRef()
  const [isFetching, setIsFetching] = React.useState(false)
  const [isCodeExpired, setIsCodeExpired] = React.useState(false)
  const [discountCodeInputValue, setDiscountCodeInputValue] = React.useState("")
  const matchingCode = useDiscount(state, discountCodeInputValue)
  // console.log({ matchingCode })

  // const rootDiscountCode = state.getMatchingDiscountCode(discountCodeInputValue)
  // const discountCode = `BOX-OF-${state.boxQuantityCount}`
  // const isDiscountInputDirty = !!discountCodeInputValue
  // const isDiscountCodeValid = !!rootDiscountCode
  // const [code, setCode] = React.useState(`BOX-OF-${state.boxQuantityCount}`)
  // const isCodeEntered = discountCodeInputValue.length > 0
  // const isCodeEnteredAndValid = isCodeEntered && rootDiscountCode
  // const isCheckoutButtonDisabled = isFetching || (isCodeEntered && !rootDiscountCode)
  // window.state = state

  // function handleInvalidCode() {
  //   setIsFetching(false)
  // }

  // function handleFinalCodeMatch(match, code) {
  //   // if (match.ends_at)
  //   console.log("CODE:", code)
  //   setCode(code)
  //   setIsFetching(false)
  // }

  // async function createDiscount(base, code, value) {
  //   const url = "https://pnf-services.tasteink.com/api/createDiscount"
  //   const headers = { "Content-Type": "application/json" }
  //   const body = { ...base, discount_type: "fixed_amount", code, value }

  //   console.log({ base, code, value, body, url, headers })
  //   const { discount } = await wretch(url).headers(headers).post(body).json()
  //   console.log("CREATE DISCOUNT", discount)
  //   console.log("CODE:", code)
  //   setCode(code)

  //   window.getDiscountedUrl = (checkoutUrl) => {
  //     console.log("CODE:", code)
  //     const moreThanOneProduct = state.boxQuantityCount > 1
  //     const discountUrl = `${checkoutUrl}&discount=${code}`
  //     return moreThanOneProduct ? discountUrl : checkoutUrl
  //   }

  //   setIsFetching(false)
  //   state.getRechargeDiscounts()
  // }

  // function getNewDiscountCodeValue() {
  //   if (rootDiscountCode.discount_type === "fixed_amount") {
  //     return rootDiscountCode.value + getBoxQuantityDiscount()
  //   }

  //   const percent = rootDiscountCode.value / 100
  //   // const priceAfterQuantityDiscount = state.cartTotalPrice - getBoxQuantityDiscount() * 100
  //   const totalDiscountFromCode = state.cartTotalPrice * percent
  //   return totalDiscountFromCode / 100 + getBoxQuantityDiscount()
  // }

  // function getBoxQuantityDiscount() {
  //   return (state.boxQuantityCount - 1) * 20
  // }

  // function handleDiscountCode() {
  //   if (!rootDiscountCode) return handleInvalidCode()
  //   const code = rootDiscountCode.code + `-BOX-OF-${state.boxQuantityCount}`
  //   const value = getNewDiscountCodeValue()
  //   const match = state.getMatchingDiscountCode(code)
  //   if (match) return handleFinalCodeMatch(match, code)
  //   if (!match) createDiscount(rootDiscountCode, code, value)
  // }

  // const [isButtonDisabled, buttonText] = (() => {
  //   if (!isDiscountInputDirty) return [false, "CHECKOUT"]
  //   if (isFetching) return [true, "CHECKING CODE"]
  //   if (!isDiscountCodeValid) return [true, "INVALID CODE"]
  //   return [false, "☑ CHECKOUT"]
  // })()

  // React.useEffect(() => {
  //   if (discountCodeInputValue) {
  //     setIsFetching(true)
  //     timeout.current && clearTimeout(timeout.current)
  //     timeout.current = setTimeout(handleDiscountCode, 750)
  //   }
  // }, [discountCodeInputValue])

  const [isButtonDisabled, buttonText] = (() => {
    if (discountCodeInputValue && !matchingCode) return [true, "INVALID CODE"]
    if (!discountCodeInputValue) return [false, "CHECKOUT"]
    return [false, "CHECKOUT"]
  })()

  window.getDiscountedUrl = (checkoutUrl) => {
    const code = matchingCode ? matchingCode.code : `BOX-OF-${state.boxQuantityCount}`
    const discountUrl = `${checkoutUrl}&discount=${code}`
    return discountUrl
  }

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

        <CheckoutButton isDisabled={isButtonDisabled}>{buttonText}</CheckoutButton>

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
  return <Button isPrimary style={{ width: "100%" }} name='checkout' className='checkout_button' {...props} />
}

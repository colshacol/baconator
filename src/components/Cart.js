import * as React from "react"
import styled from "styled-components"
import getValue from "get-value"
import { slide as Menu } from "react-burger-menu"
import { Button } from "./Button"
import { useScript } from "../utilities/useScript"
import { Store } from "../../store"

const prices = {
  0: "$0.00",
  1: "49.99",
  2: "$79.99",
  3: "$109.99",
  4: "$139.99",
  5: "$169.99",
  6: "$199.99",
}

export const CartMenu = (props) => {
  const state = Store.useStoreState((state) => ({
    isSideCartOpen: state.isSideCartOpen,
  }))

  const actions = Store.useStoreActions((actions) => ({
    toggleIsSideCartOpen: actions.toggleIsSideCartOpen,
  }))

  return (
    <StyledMenu
      right
      width='360px'
      className='CartView'
      isOpen={state.isSideCartOpen}
      onOpen={() => actions.toggleIsSideCartOpen()}
      onClose={() => actions.toggleIsSideCartOpen(false)}
    >
      <Cart style={{ paddingLeft: 16 }} />
    </StyledMenu>
  )
}

export const Cart = (props) => {
  const state = Store.useStoreState((state) => ({
    isSideCartOpen: state.isSideCartOpen,
    cartListItems: state.cartListItems,
    selectedProductCount: state.selectedProductCount,
    selectedProductVariantIds: state.selectedProductVariantIds,
    isBoxEmpty: state.isBoxEmpty,
    cartItems: state.cartItems,
  }))

  const actions = Store.useStoreActions((actions) => ({
    toggleIsSideCartOpen: actions.toggleIsSideCartOpen,
    removeProductFromBox: actions.removeProductFromBox,
    removeProductsFromBox: actions.removeProductsFromBox,
    updateCart: actions.updateCart,
    emptyCart: actions.emptyCart,
  }))

  React.useEffect(() => {
    actions.emptyCart()
  }, [])

  React.useEffect(() => {
    if (state.cartItems) {
      console.log("Cart - updating cart.")
      actions.updateCart()
    }
  }, [state.cartItems])

  const status = useScript(window.pedersonsData.assets.rechargeScriptUrl + `&t=${Date.now()}`)

  React.useEffect(() => {
    status === "ready" && window.reChargeCartJS()
  }, [status === "ready"])

  return (
    <StyledCart className={props.className} style={props.style}>
      <div className='top'>
        <h3 className='boxTitle'>Your Box ({state.selectedProductCount})</h3>
        {state.isBoxEmpty && (
          <div
            style={{
              width: "100%",
              height: "100px",
              fontStyle: "italic",
              display: "flex",
              alignItems: "center",
              color: "var(--brandBlack50)",
            }}
          >
            No products to show. :(
          </div>
        )}
        {state.cartListItems.map(({ title, quantity, id }) => (
          <CartItem
            title={title}
            quantity={quantity}
            key={title}
            id={id}
            removeProductFromBox={actions.removeProductFromBox}
            removeProductsFromBox={actions.removeProductsFromBox}
          />
        ))}
      </div>
      <div className='priceContainer'>
        <ShippingPrice />
        <CartPrice />
        <CheckoutButton />
      </div>
    </StyledCart>
  )
}

const CartItem = (props) => {
  const title = props.title.substring(0, props.title.indexOf(" - ")) || props.title

  return (
    <div className='cartItem' key={title}>
      <p>
        {title} (x{props.quantity})
      </p>
      <span style={{ display: "flex", justifyContent: "space-between" }}>
        {props.quantity > 1 ? (
          <>
            <small onClick={() => props.removeProductFromBox(props.id)}>remove one</small>
            <small onClick={() => props.removeProductsFromBox(props.id)}>remove all</small>
          </>
        ) : (
          <small onClick={() => props.removeProductsFromBox(props.id)}>remove</small>
        )}
      </span>
    </div>
  )
}

const ShippingPrice = (props) => {
  return (
    <div className='shippingRow'>
      <p>Shipping:</p>
      <h4 className='shippingPrice'>FREE</h4>
    </div>
  )
}

const CartPrice = (props) => {
  const state = Store.useStoreState((state) => ({
    cartPrice: state.cartPrice,
  }))

  return (
    <div className='priceRow'>
      <h2>Total:</h2>
      <h2 className='price'>${state.cartPrice}</h2>
    </div>
  )
}

const CheckoutButton = (props) => {
  const state = Store.useStoreState((state) => ({
    isBoxEmpty: state.isBoxEmpty,
  }))

  return (
    <Button isPrimary name='checkout' isDisabled={state.isBoxEmpty} className='checkout_button'>
      Checkout
    </Button>
  )
}

const StyledMenu = styled(Menu)`
  background: #fff;
`

const StyledCart = styled.div`
  width: 100%;
  height: 100%;
  display: flex !important;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 16px;

  .top {
    display: flex;
    flex-direction: column;
  }

  .cartItem {
    margin-bottom: 24px;

    p {
      color: var(--brandBlack100);
      line-height: 150%;
    }

    small {
      color: var(--brandGreen100);
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .boxTitle {
    text-align: right;
    margin-bottom: 24px;
    color: var(--brandBlack100);
  }

  .shippingRow {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--brandBlack50);
    padding-bottom: 8px;

    p {
      color: var(--brandBlack100);
    }

    h4 {
      color: var(--brandGreen100);
    }
  }

  .priceRow {
    padding-top: 8px;
    display: flex;
    justify-content: space-between;

    h2 {
      color: var(--brandBlack100);
    }

    h2.price {
      color: var(--brandGreen100);
    }
  }

  .checkout_button {
    margin-top: 24px;
    width: 100%;
  }
`

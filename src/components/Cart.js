import * as React from "react"
import styled from "styled-components"
import getValue from "get-value"
import { slide as Menu } from "react-burger-menu"
import { Button } from "./Button"
import { useScript } from "../utilities/useScript"
import { Store } from "../../store"
import { useCart, products, collections } from "../state"

const useRechargeScript = () => {
  const status = useScript(window.pedersonsData.assets.rechargeScriptUrl)

  React.useEffect(() => {
    status === "ready" && window.reChargeCartJS()
  }, [status === "ready"])

  return status
}

export const Cart = (props) => {
  const cart = useCart()
  useRechargeScript()

  const style = {
    width: "100%",
    height: "100px",
    fontStyle: "italic",
    display: "flex",
    alignItems: "center",
    color: "var(--brandBlack50)",
  }

  const emptyState = !cart.cartInfo.productCount && (
    <div style={style}>
      <p>Empty</p>
    </div>
  )

  const loadingState = cart.cartInfo.isLoading && (
    <div style={style}>
      <p>Loading</p>
    </div>
  )

  const cartItems = Object.entries(cart.cartInfo.cartItems)

  const BoxList = () => {
    return cartItems.map(([pid, { title, quantity, productId }]) => (
      <CartItem
        title={title.slice(0, title.indexOf(" - "))}
        quantity={quantity}
        key={title}
        id={productId}
        removeProductFromBox={() =>
          cart.actions.decrementCartProductQuantity(products.getById(productId))
        }
        removeProductsFromBox={async () => {
          const product = products.getById(productId)
          cart.actions.removeProductFromCart(product)
        }}
      />
    ))
  }

  return (
    <StyledCart className={props.className + " SideCart"} style={props.style}>
      <h3 className='boxTitle'>Your Box</h3>
      <div className='top'>
        {emptyState}
        {loadingState}
        {!emptyState && !loadingState && <BoxList />}
      </div>
      <div className='priceContainer'>
        <ShippingPrice />
        <CartPrice price={cart.data.total_price} />
        <CheckoutButton isBoxEmpty={!cart.cartInfo.productCount} />
      </div>
    </StyledCart>
  )
}

const CartItem = (props) => {
  return (
    <div className='cartItem' key={props.title}>
      <p className='cartItemTitle'>
        {props.title} (x{props.quantity})
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
  return (
    <div className='priceRow'>
      <h2>Total:</h2>
      <h2 className='price'>${props.price / 100}</h2>
    </div>
  )
}

const CheckoutButton = (props) => {
  return (
    <Button isPrimary name='checkout' isDisabled={props.isBoxEmpty} className='checkout_button'>
      Checkout
    </Button>
  )
}

const StyledCart = styled.div`
  width: 100%;
  height: 100%;
  display: flex !important;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 16px;

  .cartItemTitle {
    font-size: 14px;
    letter-spacing: 0.3px;
  }

  .top {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    margin-bottom: 16px;
    padding-right: 16px;
  }

  .top::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  .top::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  .top::-webkit-scrollbar-thumb {
    background-color: #000000;
    border: 2px solid #555555;
  }

  @media (min-width: 760px) {
    .top {
      max-height: 450px;
    }
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
    margin-bottom: 8px;
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

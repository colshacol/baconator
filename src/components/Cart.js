import * as React from "react"
import styled from "styled-components"
import { useBoxState } from "../useBoxState"
import { Button } from "./Button"

export const Cart = (props) => {
  const state = useBoxState()

  return (
    <StyledCart className={props.className + " SideCart"} style={props.style}>
      <h3 className='boxTitle'>Your Box</h3>
      <div className='top'>
        {!state.boxProductCount && <EmptyState />}
        {state.boxProductCount && (
          <BoxList
            boxProductList={state.boxProductList}
            removeItem={state.removeItem}
            removeProduct={state.removeProduct}
          />
        )}
      </div>
      <div className='priceContainer'>
        <ShippingPrice />
        <CartPrice price={state.cartTotalPrice} />
        <GoToCheckoutButton
          isBoxEmpty={!state.boxProductCount}
          onClick={() => {
            state.isCartOpen.setFalse()
            state.boxProductCount && state.setIsCheckoutOpen(true)
          }}
        />
      </div>
    </StyledCart>
  )
}

const BoxList = (props) => {
  return props.boxProductList.map(({ title, quantity, id }) => (
    <CartItem
      title={title}
      quantity={quantity}
      key={title}
      id={id}
      removeItem={() => props.removeItem(id)}
      removeProduct={async () => props.removeProduct(id)}
    />
  ))
}

const emptyStateStyle = {
  width: "100%",
  height: "100px",
  fontStyle: "italic",
  display: "flex",
  alignItems: "center",
  color: "var(--brandBlack50)",
}

const EmptyState = () => (
  <div style={emptyStateStyle}>
    <p>Empty</p>
  </div>
)

const CartItem = (props) => {
  return (
    <div className='cartItem' key={props.title}>
      <p className='cartItemTitle'>
        {props.title} (x{props.quantity})
      </p>
      <span style={{ display: "flex", justifyContent: "space-between" }}>
        {props.quantity > 1 ? (
          <>
            <small onClick={() => props.removeItem(props.id)}>remove one</small>
            <small onClick={() => props.removeProduct(props.id)}>remove all</small>
          </>
        ) : (
          <small onClick={() => props.removeItem(props.id)}>remove</small>
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

const GoToCheckoutButton = (props) => {
  return (
    <Button
      isPrimary
      isDisabled={props.isBoxEmpty}
      style={{ width: "100%", marginTop: 16 }}
      onClick={() => {
        props.onClick()
      }}
    >
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

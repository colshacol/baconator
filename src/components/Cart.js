import * as React from "react"
import styled from "styled-components"
import getValue from "get-value"
import { slide as Menu } from "react-burger-menu"
import { useBoxStore, useCartStore } from "../stores"

const prices = {
  0: "$0.00",
  1: "49.99",
  2: "$79.99",
  3: "$109.99",
  4: "$139.99",
  5: "$169.99",
  6: "$199.99",
}

export const Cart = (props) => {
  const cartStore = useCartStore()
  const boxStore = useBoxStore()

  React.useEffect(() => console.log("MOUNTING CART", { cartStore }), [])

  const items = cartStore.cart.items || []

  return (
    <StyledMenu
      right
      width='360px'
      className='CartView'
      isOpen={cartStore.isCartOpen}
      onOpen={() => cartStore.toggleIsCartOpen()}
      onClose={() => cartStore.toggleIsCartOpen(false)}
    >
      <div className='innerContainer'>
        <h2 className='boxTitle'>Box of {boxStore.products.length}</h2>
        {items.map((item) => (
          <div className='cartItem'>
            <p>
              {item.title.substring(0, item.title.indexOf(" - "))} (x{item.quantity})
            </p>
          </div>
        ))}
      </div>
      <h2 className='price'>{prices[boxStore.products.length]}</h2>
    </StyledMenu>
  )
}

const StyledMenu = styled(Menu)`
  background: #fff;

  .innerContainer {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .cartItem {
    margin-bottom: 24px;

    p {
      color: #446263;
    }
  }

  .boxTitle {
    margin-bottom: 24px;
    color: #02383a;
  }

  .price {
    margin-bottom: 48px;
    color: #02383a;
  }
`

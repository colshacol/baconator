import * as React from "react"
import styled from "styled-components"
import getValue from "get-value"
import { slide as Menu } from "react-burger-menu"
import { useBoxStore, useCartStore, useProductsStore } from "../stores"
import { Button } from "./Button"
import { useScript } from "../utilities/useScript"

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
  const productsStore = useProductsStore()

  const status = useScript(
    window.pedersonsData.assets.rechargeScriptUrl + `&t=${Date.now()}`
  )

  React.useEffect(() => {
    status === "ready" && window.reChargeCartJS()
  }, [status === "ready"])

  console.log({ boxStore })
  // const items = cartStore.cart.items || []
  const items = boxStore.products.map((id) => productsStore.getProductById(id))
  console.log({ items })

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
        <div className='top'>
          <h2 className='boxTitle'>Your Box ({boxStore.products.length})</h2>
          {items.map((item, index) => (
            <div className='cartItem' key={item.title + index}>
              <p>
                {item.title.substring(0, item.title.indexOf(" - ")) || item.title}
                {/*(x{item.quantity})*/}
              </p>
            </div>
          ))}
        </div>
        <div className='priceContainer'>
          <div className='shippingRow'>
            <p>Shipping:</p>
            <h4 className='shippingPrice'>FREE</h4>
          </div>
          <div className='priceRow'>
            <h2>Total:</h2>
            <h2 className='price'>${cartStore.cart.total_price / 100}</h2>
          </div>
          <Button isPrimary name='checkout' className='checkout_button'>
            Checkout
          </Button>
        </div>
      </div>
      {/* {useScript && (
        <script
          src={window.pedersonsData.assets.rechargeScriptUrl}
          type='text/javascript'
        />
      )} */}
    </StyledMenu>
  )
}

const StyledMenu = styled(Menu)`
  background: #fff;

  .innerContainer {
    height: 100%;
    display: flex !important;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 16px;

    .top {
      display: flex;
      flex-direction: column;
    }
  }

  .cartItem {
    margin-bottom: 24px;

    p {
      color: #446263;
    }
  }

  .boxTitle {
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

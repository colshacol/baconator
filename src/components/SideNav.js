import * as React from "react"
import styled from "styled-components"
import getValue from "get-value"
import { slide as Menu } from "react-burger-menu"
import { useSharedStore, useCartStore } from "../stores"
import { Button } from "./Button"
import { Link, Route, navigate } from "wouter"

export const SideNav = (props) => {
  const sharedStore = useSharedStore()

  return (
    <StyledMenu
      right
      width='360px'
      className='SideNav'
      isOpen={sharedStore.isSideNavOpen}
      onOpen={() => sharedStore.toggleIsSideNavOpen(true)}
      onClose={() => sharedStore.toggleIsSideNavOpen(false)}
    >
      <div className='innerContainer'>
        <div className='top' onClick={() => sharedStore.toggleIsSideNavOpen(false)}>
          <Link href='/'>
            <a className='bottomLink'>Home</a>
          </Link>
          <Link href='/catalog'>
            <a className='bottomLink'>Catalog</a>
          </Link>
        </div>
      </div>
    </StyledMenu>
  )
}

const StyledMenu = styled(Menu)`
  background: #fff;

  .bottomLink {
    font-size: 24px;
    margin-bottom: 24px;
  }

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

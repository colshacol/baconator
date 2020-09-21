import * as React from "react"
import styled from "styled-components"
import getValue from "get-value"
import { slide as Menu } from "react-burger-menu"
import { useSharedStore, useCartStore } from "../stores"
import { Button } from "./Button"
import { Link, Route, navigate } from "wouter"
import { Store } from "../../store"

export const SideNav = (props) => {
  return (
    <StyledMenu
      right
      width='360px'
      className='SideNav'
      isOpen={props.isOpen}
      onOpen={() => props.toggle(true)}
      onClose={() => props.toggle(false)}
    >
      <div className='container'>
        <div className='innerContainer' onClick={() => props.toggle(false)}>
          <Link href='/'>
            <p className='linky'>Shop</p>
          </Link>
          <a href='https://pedersonsfarms.com/find'>
            <p className='linky'>Find</p>
          </a>
          <a href='https://pedersonsfarms.com/sell'>
            <p className='linky'>Sell</p>
          </a>
          <Link href='/products'>
            <p className='linky'>Products</p>
          </Link>
          <a href='/admin' className='linky'>
            Recipes
          </a>
          <a href='/admin' className='linky'>
            Sign In
          </a>
        </div>
      </div>
    </StyledMenu>
  )
}

const StyledMenu = styled(Menu)`
  background: #fff;

  .container {
    height: 100%;
    display: flex !important;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 16px;
    align-items: flex-end;
    text-align: right;

    .innerContainer {
      display: flex;
      flex-direction: column;
    }

    .linky {
      cursor: pointer;
      font-size: 24px;
      line-height: 200%;
      color: var(--brandGreen100);
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

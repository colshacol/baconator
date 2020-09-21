import * as React from "react"
import styled from "styled-components"
import { Button } from "./Button"
import { Link, Route } from "wouter"
import { push as Menu } from "react-burger-menu"
import { useSharedStore } from "../stores"
import { Store } from "../../store"
import { Product } from "../views/Product"

export const BoxProductOptionQuickView = (props) => {
  React.useEffect(() => {
    if (props.isOpen.value) {
      document.querySelector(".QuickView").addEventListener("click", (event) => {
        const innerContainer = document.querySelector(".QuickView .innerContainer")
        event.currentTarget.contains(innerContainer) && props.toggle(false)
      })
    }
  }, [props.isOpen.value])

  // if (!props.isOpen.value || !props.product) return null

  return (
    <StyledMenu
      width='100%'
      className='QuickView'
      isOpen={!!props.isOpen.value}
      onOpen={props.isOpen.setTrue}
      onClose={props.isOpen.setFalse}
    >
      {props.isOpen && props.product && <Product params={{ productId: props.product.id }} />}
    </StyledMenu>
  )
}

const StyledMenu = styled(Menu)`
  top: 0px;
  left: 0px;

  .ProductTitle {
    display: none;
  }

  .ProductWrapper {
    background: #fff;
    overflow-y: scroll;
  }

  /* .innerContainer {
    display: flex;
    flex-direction: column;
    max-width: 980px;
    background: #fff;
    margin: 0 auto;
    height: 100%;
    padding: 48px;
  } */
`

import { slide as Menu } from "react-burger-menu"
import { useLocation } from "wouter"
import * as React from "react"
import styled from "styled-components"
import { Store } from "./../../store"
import { useWindowWidth } from "@react-hook/window-size"
import { Cart } from "./Cart"
import useBoolean from "react-hanger/useBoolean"
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants"

export const FloatingCartIcon = (props) => {
  const [location] = useLocation()
  const isCartOpen = useBoolean(false)
  const windowWidth = useWindowWidth()
  const isHomeRoute = location === "/"
  const isLargeScreen = windowWidth > 760

  if (isHomeRoute && isLargeScreen) return null
  console.log("???", isHomeRoute && isLargeScreen)
  console.log("??????", isCartOpen.value)
  // Do not display on

  return (
    <>
      <CartMenu isOpen={isCartOpen.value} toggle={isCartOpen.toggle} style={{ top: 0 }} />
      <StyledFloatingCartIcon
        id='FloatingCartIcon'
        isHomeRoute={isHomeRoute}
        onClick={isCartOpen.toggle}
      >
        <img src={window.pedersonsData.assets.cartIconUrl1} alt='cart icon' />
      </StyledFloatingCartIcon>
    </>
  )
}

export const CartMenu = (props) => {
  console.log("\n\nCART MENU!!!", props)
  return (
    <StyledMenu
      right
      width='360px'
      className='CartView'
      isOpen={props.isOpen}
      onOpen={() => props.toggle()}
      onClose={() => props.toggle(false)}
    >
      <Cart style={{ paddingLeft: 16 }} />
    </StyledMenu>
  )
}

const StyledMenu = styled(Menu)`
  background: #fff;
  z-index: 1000;
`

const StyledFloatingCartIcon = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 64px;
  height: 64px;
  background: var(--brandYellow100);
  border-radius: 50px;
  box-shadow: 0px 2px 16px var(--brandBlack40);
  justify-content: center;
  align-items: center;
  z-index: 250;
  display: flex;

  @media (min-width: 760px) {
    display: ${(props) => (props.isHomeRoute ? "none" : "flex")};
  }

  :hover {
    box-shadow: 0px 2px 16px var(--brandBlack70);
  }

  img {
    max-width: 32px;
  }
`

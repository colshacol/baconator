import { useWindowWidth } from "@react-hook/window-size"
import * as React from "react"
import { slide as Menu } from "react-burger-menu"
import styled from "styled-components"
import { useLocation } from "wouter"
import { useBoxState } from "../useBoxState"
import { Cart } from "./Cart"

export const FloatingCartIcon = () => {
  const state = useBoxState()
  const [location] = useLocation()
  const windowWidth = useWindowWidth()
  const isHomeRoute = location === "/"
  const isLargeScreen = windowWidth > 760

  if (window.location.pathname.startsWith("/tools")) return null
  if (window.location.pathname.startsWith("/account")) return null
  if (window.location.pathname.startsWith("/challenge")) return null
  if (isHomeRoute && isLargeScreen) return null

  return (
    <>
      <CartMenu isOpen={state.isCartOpen.value} toggle={state.isCartOpen.toggle} style={{ top: 0 }} />
      <StyledFloatingCartIcon id='FloatingCartIcon' isHomeRoute={isHomeRoute} onClick={state.isCartOpen.toggle}>
        <img src={window.pedersonsData.assets.cartIconUrl1} alt='cart icon' />
      </StyledFloatingCartIcon>
    </>
  )
}

export const CartMenu = (props) => {
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
  left: 16px;
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

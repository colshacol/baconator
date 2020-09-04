import * as React from "react"
import styled from "styled-components"
import { Button } from "./Button"
import { Link, Route } from "wouter"
import { push as Menu } from "react-burger-menu"
import { useSharedStore } from "../stores"

export const BoxProductOptionQuickView = (props) => {
  const sharedStore = useSharedStore()

  React.useEffect(() => {
    if (sharedStore.isQuickViewOpen) {
      document.querySelector(".QuickView").addEventListener("click", (event) => {
        const innerContainer = document.querySelector(".QuickView .innerContainer")
        event.target.contains(innerContainer) && sharedStore.toggleIsQuickViewOpen(false)
      })
    }
  }, [sharedStore.isQuickViewOpen])

  return (
    <StyledMenu
      width='100%'
      className='QuickView'
      isOpen={sharedStore.isQuickViewOpen}
      onOpen={() => sharedStore.toggleIsQuickViewOpen()}
      onClose={() => sharedStore.toggleIsQuickViewOpen(false)}
    >
      {sharedStore.isQuickViewOpen && (
        <div className='innerContainer'>
          <h1>{sharedStore.quickViewProduct.title}</h1>
        </div>
      )}
    </StyledMenu>
  )
}

const StyledMenu = styled(Menu)`
  .QuickView {
    background: transparent !important;
  }

  .innerContainer {
    display: flex;
    flex-direction: column;
    max-width: 980px;
    background: #fff;
    margin: 0 auto;
    height: 100%;
    padding: 48px;
  }
`

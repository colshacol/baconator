import ScrollMenu from "react-horizontal-scrolling-menu"
import React from "react"
import { Link, Route } from "wouter"
import styled from "styled-components"
import { useProductsStore } from "../stores"

export const ProductsPreviewScroller = (props) => {
  const productsStore = useProductsStore()

  return (
    <StyledWrapper>
      <ScrollMenu
        data={menu}
        arrowLeft={ArrowLeft}
        arrowRight={ArrowRight}
        selected={selected}
        onSelect={this.onSelect}
      />
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  padding: 24px 48px;

  .menu-item {
    padding: 0 40px;
    margin: 5px 10px;
    user-select: none;
    cursor: pointer;
    border: none;
  }
  .menu-item-wrapper.active {
    border: 1px blue solid;
  }
  .menu-item.active {
    border: 1px green solid;
  }

  .scroll-menu-arrow {
    padding: 20px;
    cursor: pointer;
  }
`

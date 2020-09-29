import * as React from "react"
import styled from "styled-components"
import { Button } from "./Button"
import { useBoxStore, useSharedStore } from "../stores"
import { Link } from "wouter"

export const ProductListProduct = (props) => {
  const media = props.product.media ? props.product.media[1] : {}
  const title = props.product.title.slice(0, props.product.title.indexOf("("))

  return (
    <ProductListProductContainer>
      <Link href={`/product/${props.product.id}`}>
        <ProductListProductTop imageSrc={media ? media.src : ""}></ProductListProductTop>
      </Link>
      <ProductListProductBottom>
        <Link href={`/product/${props.product.id}`}>
          <ProductListProductTitle>
            {props.product.titleWithoutPackageQuantity}
          </ProductListProductTitle>
        </Link>
      </ProductListProductBottom>
    </ProductListProductContainer>
  )
}

const ProductListProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: var(--white);
  cursor: pointer;
`

const ProductListProductTop = styled.div`
  position: relative;
  background: url(${(props) => props.imageSrc});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  padding-top: 100%;

  @media (min-width: 530px) {
    padding-top: 100%;
  }
`

const ProductListProductBottom = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 16px 0px;
  width: 100%;
`

const ProductListProductTitle = styled.h3`
  font-weight: 700;
  font-size: 18px;
  color: var(--brandDarkGreen100);
  /* text-shadow: 0px 2px #000; */
`

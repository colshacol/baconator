import * as React from "react"
import styled from "styled-components"
import { Button } from "./Button"
import { useBoxStore, useSharedStore } from "../stores"
import { Link } from "wouter"

export const ProductListProduct = (props) => {
  return (
    <ProductListProductContainer>
      <Link href={`/product/${props.id}`}>
        <ProductListProductTop imageSrc={props.media[0].src}></ProductListProductTop>
      </Link>
      <ProductListProductBottom>
        <Link href={`/product/${props.id}`}>
          <ProductListProductTitle>{props.title}</ProductListProductTitle>
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
  background-size: cover;
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

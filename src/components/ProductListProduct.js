import * as React from "react"
import styled from "styled-components"
import { Button } from "./Button"
import { useBoxStore, useSharedStore } from "../stores"
import { Link } from "wouter"

export const ProductListProduct = (props) => {
  console.log({ props })

  return (
    <ProductListProductContainer>
      <Link href={`/product/${props.id}`}>
        <ProductListProductTop imageSrc={props.images[0].src}></ProductListProductTop>
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
  border: 1px solid #446264;
  align-items: flex-start;
  background: var(--white);
`

const ProductListProductTop = styled.div`
  position: relative;
  background: url(${(props) => props.imageSrc});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  padding-top: 50%;

  @media (min-width: 530px) {
    padding-top: 60%;
  }
`

const ProductListProductBottom = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 16px;
  width: 100%;
`

const ProductListProductTitle = styled.h3`
  font-weight: 700;
  font-size: 18px;
  color: var(--darkGreen);
  margin-bottom: 16px;
  /* text-shadow: 0px 2px #000; */
`

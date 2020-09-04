import React from "react"
import { Link, Route } from "wouter"
import styled from "styled-components"
import { useProductsStore } from "../stores"
import isEmpty from "is-empty"
import { Ellipsis } from "react-css-spinners"

export const Product = (props) => {
  const productsStore = useProductsStore()
  const [product, setProduct] = React.useState({})

  React.useEffect(() => {
    const product = productsStore.getProductById(props.params.productId)
    setProduct(product)
  }, [productsStore.products.length])

  if (isEmpty(product)) {
    return <Ellipsis color='#ffdf00' size={40} />
  }

  console.log({ product })

  return (
    <StyledWrapper>
      <ProductHeader>
        <div className='absoluteContainer'>
          <div className='innerContainer'>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductImage src={product.images[1].src} alt={product.title} />
            <ProductDetails>
              <div
                className='productDescription'
                dangerouslySetInnerHTML={{ __html: `<div>${product.body_html}</div>` }}
              />
            </ProductDetails>
          </div>
        </div>
        {/* <ProductBuyingOptions>
          <p>Available online and in stores.</p>
        </ProductBuyingOptions> */}
      </ProductHeader>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-around;
  background: #02383a;
  position: relative;
  height: 320px;

  .absoluteContainer {
    width: 100%;
    margin: 0 auto;
    position: absolute;
    top: 0;
    left: 0;
  }

  .innerContainer {
    flex-wrap: wrap;
    width: 100%;
    max-width: 1080px;
    display: flex;
    flex-direction: column;
    padding: 80px 24px;
  }

  @media screen and (min-width: 760px) {
    height: 360px;
  }

  @media screen and (min-width: 930px) {
    .innerContainer {
      flex-direction: row;
      justify-content: space-between;
    }
    .absoluteContainer {
      padding-left: calc(((100vw - 1080px) / 2) + 24px);
      padding-right: calc(((100vw - 1080px) / 2) + 24px);
    }
  }
`

const ProductImage = styled.img`
  max-width: 100%;
  margin: 0 auto;

  @media screen and (min-width: 570px) {
    max-width: 65%;
  }

  @media screen and (min-width: 930px) {
    max-width: 65%;
  }
`

const ProductTitle = styled.h1`
  color: #fff;

  width: 100%;
  text-align: center;
  margin-right: 0;
  padding: 0;
  margin-bottom: 24px;

  @media screen and (min-width: 930px) {
    width: 30%;
    margin-right: 24px;
    padding-top: 48px;
    text-align: left;
  }
`

const ProductBuyingOptions = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
`

const ProductDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .productDescription {
    margin-top: 48px;
    margin-bottom: 48px;
    line-height: 140%;
  }
`

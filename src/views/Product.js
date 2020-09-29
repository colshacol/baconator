import React from "react"
import { Link, Route } from "wouter"
import styled from "styled-components"
import { useProductsStore } from "../stores"
import isEmpty from "is-empty"
import { Store } from "../../store"
import ImageGallery from "react-image-gallery"
import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"
import Gallery from "react-photo-gallery"
import { useCart, products } from "../state"
import { Button } from "../components/Button"
import { useBoxState } from "../useBoxState"

const Galleryx = (props) => {
  return (
    <Carousel>
      {props.images.map((image) => (
        <div key={image.thumbnail}>
          <img src={image.thumbnail} alt='preview image' />
          <p className='legend'></p>
        </div>
      ))}
    </Carousel>
  )
}
// const images = [
//   {
//     original: "https://picsum.photos/id/1018/1000/600/",
//     thumbnail: "https://picsum.photos/id/1018/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1015/1000/600/",
//     thumbnail: "https://picsum.photos/id/1015/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1019/1000/600/",
//     thumbnail: "https://picsum.photos/id/1019/250/150/",
//   },
// ]

const useProduct = (id) => {
  const state = Store.useStoreState((state) => ({
    allProducts: state.allProducts,
  }))

  const product = state.allProducts.find((product) => {
    return product.id === Number(id)
  })

  return product
}

const useImages = (product) => {
  return product.media.slice(2, 5).reduce((final, media) => {
    final.push({
      thumbnail: media.preview_image.src,
      original: media.src,
      src: media.src,
      width: 1,
      height: 1,
    })

    return final
  }, [])
}

export const Product = (props) => {
  const state = useBoxState()
  const cart = useCart()
  const product = products.getById(props.params.productId)
  const images = useImages(product)

  if (isEmpty(product)) {
    return <p>Loading...</p>
  }

  const image = product.media[1] ? product.media[1].src : product.images[0]

  return (
    <StyledWrapper className='ProductWrapper'>
      <ProductHeader
        className='ProductHeader'
        style={{
          backgroundColor: product.metaFields.packaging_color || "var(--brandDarkGreen100)",
        }}
        backgroundColor={product.metaFields.packaging_color || "var(--brandDarkGreen100)"}
      >
        <div className='absoluteContainer'>
          <div className='innerContainer'>
            <ProductTitle className='ProductTitle'>
              {product.title}{" "}
              <span
                className='productQuantityWeight'
                dangerouslySetInnerHTML={{
                  __html: product.metaFields.quantity_weight_and_pricing || "<span></span>",
                }}
              ></span>
              {!!product.metaFields.in_stores_only && (
                <Button
                  isPrimary
                  className='BoxProductOptionButton'
                  onClick={(event) => {
                    event.preventDefault()
                    window.location.replace("https://pedersonsfarms.com/where-to-buy/")
                    // cart.actions.addProductToCart(product)
                  }}
                >
                  Find a Retailer
                </Button>
              )}
              {!product.metaFields.in_stores_only && (
                <>
                  {product.isOutOfStock && (
                    <Button isDisabled className='BoxProductOptionButton'>
                      Out of Stock
                    </Button>
                  )}
                  {product.isOutOfStock ? null : state.box[product.id] ? (
                    <div className='quantityChanger'>
                      <Button
                        className='decrementButton'
                        onClick={(event) => {
                          event.preventDefault()
                          state.removeItem(product.id)
                          // props.removeProductFromBox()
                        }}
                      >
                        <img
                          className='quantityIcon'
                          src={window.pedersonsData.assets.minusIconUrl}
                          alt='decrement'
                        />
                      </Button>
                      <p className='quantityText'>{state.box[product.id].quantity}</p>
                      <Button
                        className={`incrementButton`}
                        onClick={(event) => {
                          event.preventDefault()
                          state.addItem(product.id)
                          // props.addProductToBox()
                        }}
                      >
                        <img
                          className='quantityIcon'
                          src={window.pedersonsData.assets.plusIconUrl}
                          alt='increment'
                        />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      isPrimary
                      className='BoxProductOptionButton'
                      onClick={(event) => {
                        event.preventDefault()
                        state.addItem(product.id)
                      }}
                    >
                      Add To Box
                    </Button>
                  )}
                </>
              )}
            </ProductTitle>
            <ProductImage src={image} alt={product.title} />
            <ProductDetails>
              <div
                className='productDescription'
                dangerouslySetInnerHTML={{
                  __html: `<div>${product.body_html || product.description}</div>`,
                }}
              />
              <p
                className='ingredientsList'
                dangerouslySetInnerHTML={{
                  __html: `Ingredients: ${product.metaFields.ingredients}` || "<span></span>",
                }}
              />
              {images.length && <Gallery photos={images} direction={"column"} />}
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

  .ingredientsList {
    margin: 16px 0;
  }

  .quantityChanger {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;

    .quantityIcon {
      filter: invert();
      max-width: 20px;
    }

    .decrementButton {
      border: none;
      height: 40px;
      width: 40px;
      padding-top: 9px;
      background: var(--brandGreen100);
    }

    .quantityText {
      font-size: 18px;
      text-align: center;
      width: 100%;
      background: var(--brandOffWhite100);
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .incrementButton {
      border: none;
      height: 40px;
      width: 40px;
      padding-top: 9px;
      background: var(--brandGreen100);
    }

    .incrementButton.nope {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .BoxProductOptionButton {
    width: 100%;
    max-width: 240px;
    margin-top: 16px;
  }

  .BoxProductOptionButton[disabled] {
    cursor: not-allowed;
  }
`

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-around;
  background: ${(props) => props.backgroundColor};
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

  .productQuantityWeight {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
  }

  .productQuantityWeight p {
    color: #fff;
    font-size: 16px;
    line-height: 150%;
    margin-right: 16px;
  }

  .productQuantityWeight p:first-of-type {
    /* margin-top: 16px; */
  }

  @media screen and (min-width: 930px) {
    width: 30%;
    margin-right: 24px;
    padding-top: 48px;
    text-align: left;

    .productQuantityWeight {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      margin-top: 16px;
    }
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
    line-height: 160% !important;

    p,
    span,
    div {
      line-height: 160% !important;
    }

    img {
      max-width: 100%;
      margin: 32px 0;

      @media (min-width: 760px) {
        max-width: 100%;
        padding: 0 10%;
      }
    }
  }
`

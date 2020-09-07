import React from "react"
import { Link, Route } from "wouter"
import { Ellipsis } from "react-css-spinners"
import styled from "styled-components"

import { View } from "../components/View"
import { Button } from "../components/Button"
import { BoxProductOption } from "../components/BoxProductOption"
import { useProductsStore, useCartStore, useBoxStore } from "../stores"
import { BoxProductTypeFilters } from "../components/BoxProductTypeFilters"

export const ProductList = (props) => {
  const productsStore = useProductsStore()

  if (productsStore.isFetchingProducts) {
    return <Ellipsis color='#ffdf00' size={40} />
  }

  return (
    <View
      title='Select Your Products'
      description='Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'
    >
      <>
        <ViewOptions>
          <Button className='ViewOptionsButton' onClick={cartStore.toggleIsCartOpen}>
            Show My Box ({boxStore.getProductCount()})
          </Button>
          <BoxProductTypeFilters />
        </ViewOptions>
        <BoxOptions>
          {productsStore.subscribableProducts.map((product) =>
            product.title.includes(boxStore.filter) ? (
              <BoxProductOption key={product.id} {...product} />
            ) : null
          )}
        </BoxOptions>
      </>
    </View>
  )
}

const BoxOptions = styled.div`
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px 24px;
  grid-gap: 24px 24px;

  @media (min-width: 530px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

const ViewOptions = styled.div`
  padding: 0;
  display: flex;
  flex-direction: column;

  .ViewOptionsButton {
    width: 100%;
  }

  @media screen and (min-width: 530px) {
    .ViewOptionsButton {
      width: fit-content;
    }
  }
`

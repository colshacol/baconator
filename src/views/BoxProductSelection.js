import React from "react"
import { Link, Route } from "wouter"
import { Ellipsis } from "react-css-spinners"
import styled from "styled-components"

import { View } from "../components/View"
import { Button } from "../components/Button"
import { BoxProductOption } from "../components/BoxProductOption"
import { useProductsStore, useCartStore, useBoxStore } from "../stores"
import { BoxProductTypeFilters } from "../components/BoxProductTypeFilters"

export const BoxProductSelection = (props) => {
  const boxStore = useBoxStore()
  const productsStore = useProductsStore()
  const cartStore = useCartStore()

  if (productsStore.isFetchingProducts) {
    return <Ellipsis size={240} color='var(--brandGreen50)' />
  }

  return (
    <View>
      <View.Header data-testid='View.Header'>
        <View.Title>Select Your Products</View.Title>
        <View.Description>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
          quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </View.Description>
        <Button className='ViewOptionsButton' onClick={cartStore.toggleIsCartOpen}>
          Show My Box ({boxStore.getProductCount()})
        </Button>
        <BoxProductTypeFilters />
      </View.Header>
      <View.Content>
        <BoxOptions>
          {productsStore.subscribableProducts.map((product) =>
            product.title.includes(productsStore.filter) ? (
              <BoxProductOption key={product.id} {...product} />
            ) : null
          )}
        </BoxOptions>
      </View.Content>
    </View>
  )
}

const BoxOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 32px 32px;
  grid-gap: 32px 32px;

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

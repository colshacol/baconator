import React from "react"
import { Link, Route } from "wouter"
import styled from "styled-components"
import { useProductsStore } from "../stores"
import { ProductListProduct } from "../components/ProductListProduct"
import { View } from "../components/View"
import { Button } from "../components/Button"
import { BoxProductTypeFilters } from "../components/BoxProductTypeFilters"

export const Catalog = (props) => {
  const productsStore = useProductsStore()

  return (
    <View>
      <View.Header>
        <View.Title>Product Catalog</View.Title>
        <View.Description>
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
          laboriosam, nisi ut aliquid ex ea commodi consequatur?
        </View.Description>
        <BoxProductTypeFilters />
      </View.Header>
      <View.Content>
        <ViewOptions></ViewOptions>
        <BoxOptions>
          {productsStore.products.map((product) =>
            product.title.includes(productsStore.filter) ? (
              <ProductListProduct key={product.id} {...product} />
            ) : null
          )}
        </BoxOptions>
      </View.Content>
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

import React from "react"
import { Link, Route } from "wouter"
import { Ellipsis } from "react-css-spinners"
import styled from "styled-components"

import { View } from "../components/View"
import { Button } from "../components/Button"
import { BoxProductOption } from "../components/BoxProductOption"
import { useProductsStore, useCartStore, useBoxStore } from "../stores"
import { BoxProductTypeFilters } from "../components/BoxProductTypeFilters"
import { Store } from "../../store"

export const ProductList = (props) => {
  const state = Store.useStoreState((state) => ({
    selectedProductIds: state.selectedProductIds,
    subscribableProducts: state.subscribableProducts,
    selectedProductCount: state.selectedProductCount,
    isBoxFull: state.isBoxFull,
    isBoxEmpty: state.isBoxEmpty,
  }))

  const actions = Store.useStoreActions((actions) => ({
    toggleIsSideCartOpen: actions.toggleIsSideCartOpen,
    addProductToBox: actions.addProductToBox,
    removeProductFromBox: actions.removeProductFromBox,
  }))

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
          <Button className='ViewOptionsButton' onClick={actions.toggleIsSideCartOpen}>
            Show My Box ({state.selectedProductCount})
          </Button>
          <BoxProductTypeFilters />
        </ViewOptions>
        <BoxOptions>
          {state.subscribableProducts.map((product) =>
            product.title.includes(boxStore.filter) ? (
              <BoxProductOption
                key={product.id}
                hasProduct={state.selectedProductIds.includes(product.id)}
                isBoxFull={state.isBoxFull}
                quantity={state.selectedProductIds.filter((id) => id === product.id)}
                product={product}
                toggleIsQuickViewOpen={actions.toggleIsQuickViewOpen}
              />
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

import React from "react"
import { Link, Route } from "wouter"
import { Ellipsis } from "react-css-spinners"
import styled from "styled-components"

import { View } from "../components/View"
import { Button } from "../components/Button"
import { BoxProductOption } from "../components/BoxProductOption"
import { BoxProductTypeFilters } from "../components/BoxProductTypeFilters"
import { Cart } from "../components/Cart"
import { Store } from "../../store"

export const BoxProductSelection = (props) => {
  const state = Store.useStoreState((state) => ({
    selectedProductCount: state.selectedProductCount,
    isFetchingProducts: state.isFetchingProducts,
    subscribableProducts: state.subscribableProducts,
    productListFilter: state.productListFilter,
    selectedProductIds: state.selectedProductIds,
    isBoxFull: state.isBoxFull,
    isBoxEmpty: state.isBoxEmpty,
  }))

  const actions = Store.useStoreActions((actions) => ({
    toggleIsSideCartOpen: actions.toggleIsSideCartOpen,
    setProductListFilter: state.setProductListFilter,
    addProductToBox: actions.addProductToBox,
    removeProductFromBox: actions.removeProductFromBox,
  }))

  if (state.isFetchingProducts) {
    return null
  }

  return (
    <View>
      <StyledViewHeader data-testid='StyledViewHeader'>
        <View.Title>Select Your Products</View.Title>
        <View.Description>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
          consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </View.Description>
        <Button className='ShowBoxButton' onClick={actions.toggleIsSideCartOpen}>
          Show My Box ({state.selectedProductCount})
        </Button>
        <BoxProductTypeFilters />
      </StyledViewHeader>
      <StyledViewContent>
        <StyledCart className='carty' />
        <BoxOptions>
          {state.subscribableProducts.map((product) =>
            product.title.includes(state.productListFilter) ? (
              <BoxProductOption
                key={product.id}
                hasProduct={state.selectedProductIds.includes(product.id)}
                isBoxFull={state.isBoxFull}
                quantity={state.selectedProductIds.filter((id) => id === product.id).length}
                product={product}
                toggleIsQuickViewOpen={actions.toggleIsQuickViewOpen}
                removeProductFromBox={() => actions.removeProductFromBox(product.id)}
                addProductToBox={() => actions.addProductToBox(product.id)}
              />
            ) : null
          )}
        </BoxOptions>
      </StyledViewContent>
    </View>
  )
}

const StyledViewContent = styled(View.Content)`
  @media (max-width: 760px) {
    .carty.carty {
      display: none !important;
    }
  }
`

const StyledCart = styled(Cart)`
  display: none;
  max-width: 200px !important;
  margin-right: 48px;
  position: sticky;
  top: 24px;

  @media (min-width: 760px) {
    display: flex !important;
  }
`

const StyledViewHeader = styled(View.Header)`
  @media (min-width: 760px) {
    ${Button} {
      display: none !important;
    }
  }
`

const BoxOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 32px 32px;
  grid-gap: 32px 32px;

  @media (min-width: 530px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 980px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

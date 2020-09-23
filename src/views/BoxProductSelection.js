import { BoxProductOptionQuickView } from "../components/BoxProductOptionQuickView"
import React from "react"
import styled from "styled-components"
import { Store } from "../../store"
import { BoxProductOption } from "../components/BoxProductOption"
import { BoxProductTypeFilters } from "../components/BoxProductTypeFilters"
import { Button } from "../components/Button"
import { Cart } from "../components/Cart"
import { Encouragement } from "../components/Encouragement"
import { View } from "../components/View"
import { products, useCart } from "../state"
import { Frame, motion } from "framer-motion"
import useBoolean from "react-hanger/useBoolean"

const filters = {
  All: "subscribable-products",
  Bacon: "bacon",
  Sausage: "sausage",
  "Hot Dogs": "hot-dogs",
  Ham: "ham",
  "Beef & Bison": "beef-bison",
  Pork: "pork",
  Bundles: "bundles",
}

const log = (...args) => console.log("\n\n[BoxProductSelection]", ...args)
const subscribableProductIds = pnf.subscribableProducts.map((item) => item.id)

export const BoxProductSelection = React.memo((props) => {
  const cart = useCart()
  const isQuickViewOpen = useBoolean(false)
  const [quickViewProduct, setQuickViewProduct] = React.useState()
  const [searchValue, setSearchValue] = React.useState("")
  const [collectionFilter, setCollectionFilter] = React.useState("subscribable-products")

  const onSearchInput = (event) => setSearchValue(event.target.value)
  const setFilter = (filter) => setCollectionFilter(filter)

  const productsToShow = products.subscribable.filter((product) => {
    const isInCollection = product.collections.includes(collectionFilter)
    const title = product.title.toLowerCase()
    const search = searchValue.toLocaleLowerCase()
    const matchesSearch = title.includes(search)
    return isInCollection && matchesSearch
  })

  React.useEffect(() => {
    if (!isQuickViewOpen.value) {
      setQuickViewProduct()
    }
  }, [isQuickViewOpen.value])

  console.log({
    subscribableProductIds,
    products,
    productsToShow,
    isQuickViewOpen,
    quickViewProduct,
  })

  return (
    <StyledView>
      <BoxProductOptionQuickView isOpen={isQuickViewOpen} product={quickViewProduct} />
      <Encouragement productCount={cart.cartInfo.productCount} />

      <View.TempTop
        title='How it works'
        description='Grab the reigns to customize your box of proteins. The more you buy, the more you save. Cancel, skip, or edit your monthly subscriptions anytime.'
      />

      <StyledViewContent style={{ marginTop: 48 }}>
        <BoxProductTypeFilters
          filter={collectionFilter}
          setFilter={setFilter}
          setSearchValue={onSearchInput}
          filters={filters}
          searchValue={searchValue}
        />
        <div className='contentRow'>
          <StyledCart className='carty' />
          <BoxOptions>
            {productsToShow.map((product, index) => (
              <BoxProductOption
                index={index}
                key={product.id}
                isBoxEmpty={!cart.cartInfo.productCount}
                hasProduct={cart.actions.doesCartHaveProductId(product.id)}
                quantity={cart.actions.getCartProductQuantity(product.id)}
                product={product}
                decrementQuantity={() => {
                  cart.actions.decrementCartProductQuantity(product)
                }}
                incrementQuantity={() => {
                  cart.actions.incrementCartProductQuantity(product)
                }}
                addProductToBox={() => cart.actions.addProductToCart(product)}
                removeProductFromCart={() => cart.actions.decrementCartProductQuantity(product)}
                toggleIsQuickViewOpen={() => {
                  isQuickViewOpen.toggle(true)
                  setQuickViewProduct(product)
                }}
              />
            ))}
          </BoxOptions>
        </div>
      </StyledViewContent>
    </StyledView>
  )
})

const StyledView = styled(View)`
  padding-bottom: 48px;

  .bm-overlay {
    top: 0;
  }
`

const StyledViewContent = styled(View.Content)`
  display: flex;
  flex-direction: column;
  padding: 0px 12px !important;

  .contentRow {
    display: flex;
    padding: 48px 24px 24px;
  }

  @media (max-width: 760px) {
    .carty.carty {
      display: none !important;
    }
  }
`

const StyledViewDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  background: var(--brandDarkGreen100);
  padding-top: 24px;
  padding-bottom: 24px;
`

const StyledViewDescription = styled(View.Description)``

const StyledCart = styled(Cart)`
  display: none;
  max-width: 200px !important;
  margin-right: 48px;
  position: sticky;
  top: 24px;
  height: fit-content;

  @media (min-width: 760px) {
    display: flex !important;
  }
`

const StyledViewHeader = styled(View.Header)`
  padding-bottom: 48px;
`

const BoxOptions = styled.div`
  width: 100%;
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

import React from "react"
import useBoolean from "react-hanger/useBoolean"
import styled from "styled-components"
import { BoxProductOption } from "../components/BoxProductOption"
import { BoxProductOptionQuickView } from "../components/BoxProductOptionQuickView"
import { BoxProductTypeFilters } from "../components/BoxProductTypeFilters"
import { Cart } from "../components/Cart"
import { Encouragement } from "../components/Encouragement"
import { View } from "../components/View"
import { useBoxState } from "../useBoxState"

const filters = {
  All: "subscribable-products",
  Bacon: "bacon",
  Sausage: "sausage",
  "Hot Dogs": "hot-dogs",
  Ham: "ham",
  "Beef & Bison": "beef-bison",
  // Pork: "pork",
  Bundles: "bundles",
}

const _BoxProductSelection = (props) => {
  const state = useBoxState()
  const isQuickViewOpen = useBoolean(false)
  const [quickViewProduct, setQuickViewProduct] = React.useState()
  const [searchValue, setSearchValue] = React.useState("")
  const [collectionFilter, setCollectionFilter] = React.useState("subscribable-products")

  const onSearchInput = (event) => setSearchValue(event.target.value)
  const setFilter = (filter) => setCollectionFilter(filter)

  const productsToShow = Object.values(state.productIdMap).filter((product) => {
    const isInCollection = product.collections.includes(collectionFilter)
    const isSubscribable = product.tags.includes("subscribable")
    const title = product.title.toLowerCase()
    const search = searchValue.toLocaleLowerCase()
    const matchesSearch = title.includes(search)
    return isInCollection && matchesSearch && isSubscribable
  })

  React.useEffect(() => {
    if (window.location.href.includes("?")) {
      const url = new URL(window.location.href)
      const filter = url.searchParams.get("filter")
      filter && setCollectionFilter(filter)
    }
  }, [])

  React.useEffect(() => {
    if (!isQuickViewOpen.value) {
      setQuickViewProduct()
    }
  }, [isQuickViewOpen.value])

  return (
    <StyledView>
      <BoxProductOptionQuickView isOpen={isQuickViewOpen} product={quickViewProduct} />
      <Encouragement productCount={state.boxQuantityCount} />

      <View.TempTop
        title='HOW IT WORKS'
        description='Grab the reigns to customize your monthly subscription box of proteins. The more you buy, the more you save. Cancel, skip, or edit your order anytime.'
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
                isBoxEmpty={!state.boxQuantityCount}
                hasProduct={!!state.box[product.id]}
                quantity={state.box[product.id] && state.box[product.id].quantity}
                product={product}
                decrementQuantity={() => {
                  state.removeItem(product.id)
                }}
                incrementQuantity={() => {
                  state.addItem(product.id)
                }}
                addProductToBox={() => {
                  state.addItem(product.id)
                }}
                removeProductFromBox={() => {
                  state.removeItem(product.id)
                }}
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
}

export const BoxProductSelection = React.memo(_BoxProductSelection)

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

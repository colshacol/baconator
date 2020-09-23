import React from "react"
import { Link, Route } from "wouter"
import styled from "styled-components"
import { useProductsStore } from "../stores"
import { ProductListProduct } from "../components/ProductListProduct"
import { View } from "../components/View"
import { Button } from "../components/Button"
import { BoxProductTypeFilters } from "../components/BoxProductTypeFilters"
import { Store } from "../../store"
import { useCart, products } from "../state"

const filters = {
  All: "available-products",
  Bacon: "bacon",
  Sausage: "sausage",
  "Hot Dogs": "hot-dogs",
  Ham: "ham",
  "Beef & Bison": "beef-bison",
  Pork: "pork",
  Bundles: "bundles",
}

export const Catalog = (props) => {
  const cart = useCart()
  const [searchValue, setSearchValue] = React.useState("")
  const [collectionFilter, setCollectionFilter] = React.useState("available-products")

  const onSearchInput = (event) => setSearchValue(event.target.value)
  const setFilter = (filter) => setCollectionFilter(filter)

  const state = Store.useStoreState((state) => ({
    productListFilter: state.productListFilter,
    filteredProducts: state.filteredProducts,
  }))

  const actions = Store.useStoreActions((actions) => ({
    setProductListFilter: actions.setProductListFilter,
  }))

  // React.useEffect(() => {
  //   actions.setProductListFilter("available-products")
  // }, [])

  const productsToShow = products.list.filter((product) => {
    const isInCollection = product.collections.includes(collectionFilter)
    const title = product.title.toLowerCase()
    const search = searchValue.toLocaleLowerCase()
    const matchesSearch = title.includes(search)
    return isInCollection && matchesSearch
  })

  console.log({ productsToShow })

  return (
    <View>
      <View.TempTop title='Product Catalog' description='' />
      <StyledViewContent>
        <BoxProductTypeFilters
          filter={collectionFilter}
          setFilter={setFilter}
          setSearchValue={onSearchInput}
          filters={filters}
          searchValue={searchValue}
        />
        <BoxOptions>
          {productsToShow.map((product) => (
            <>
              <ProductListProduct key={product.id} product={product} />
            </>
          ))}
        </BoxOptions>
      </StyledViewContent>
    </View>
  )
}

const StyledViewContent = styled(View.Content)`
  display: flex;
  flex-direction: column;
`

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

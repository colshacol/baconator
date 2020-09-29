import React from "react"
import styled from "styled-components"
import { BoxProductTypeFilters } from "../components/BoxProductTypeFilters"
import { ProductListProduct } from "../components/ProductListProduct"
import { View } from "../components/View"
import { products } from "../state"

export const Catalog = () => {
  const [searchValue, setSearchValue] = React.useState("")
  const [collectionFilter, setCollectionFilter] = React.useState("available-products")

  const onSearchInput = (event) => setSearchValue(event.target.value)
  const setFilter = (filter) => setCollectionFilter(filter)

  const productsToShow = products.list.filter((product) => {
    const isInCollection = product.collections.includes(collectionFilter)
    const title = product.title.toLowerCase()
    const search = searchValue.toLocaleLowerCase()
    const matchesSearch = title.includes(search)
    return isInCollection && matchesSearch
  })

  return (
    <View>
      <View.TempTop title='Product Catalog' description='' />
      <StyledViewContent>
        <BoxProductTypeFilters
          filter={collectionFilter}
          setFilter={setFilter}
          setSearchValue={onSearchInput}
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
`

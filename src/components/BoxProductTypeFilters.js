import * as React from "react"
import styled from "styled-components"
import { Store } from "../../store"
import { useCleanup } from "../utilities/useCleanup"

// const filters = [
//   "All",
//   "Bacon",
//   "Sausage",
//   "Hot Dogs",
//   "Ham",
//   "Beef & Bison",
//   "Fresh Pork",
//   "Bundles",
//   // "Bacon",
//   // "Beef",
//   // "Turkey",
//   // "Ham",
//   // "Sausage",
//   // "Chorizo",
//   // "Bratwurst",
//   // "Kielbasa",
//   // "Hot Dogs",
// ]

const useStore = (props) => {
  const state = Store.useStoreState((state) => ({
    productListFilter: state.productListFilter,
    filterSearchValue: state.filterSearchValue,
  }))

  const actions = Store.useStoreActions((actions) => ({
    setProductListFilter: actions.setProductListFilter,
    setFilterSearchValue: actions.setFilterSearchValue,
  }))

  // React.useEffect(() => {
  //   actions.setProductListFilter(props.filters[props.initialFilter])

  //   return () => {
  //     actions.setProductListFilter(props.filters[props.initialFilter])
  //     actions.setFilterSearchValue("")
  //   }
  // }, [])

  return { state, actions }
}

export const BoxProductTypeFilters = (props) => {
  const { state, actions } = useStore(props)

  return (
    <BoxProductTypeFiltersContainer
      onScroll={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
    >
      <input
        className='PNFInput'
        placeholder='search product names'
        value={props.searchValue}
        onChange={props.setSearchValue}
      />
      {Object.entries(props.filters).map(([filter, handle]) => (
        <span
          key={handle}
          className={`filterOption ${props.filter === handle ? "activeFilter" : ""}`}
          onClick={() => props.setFilter(handle)}
        >
          {filter}
        </span>
      ))}
      {/* Spacer */}
      <div style={{ minWidth: 48, minHeight: 40 }}></div>
    </BoxProductTypeFiltersContainer>
  )
}

const BoxProductTypeFiltersContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 12px 24px;
  width: 100%;
  max-width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  height: fit-content;
  min-height: 40px;
  border: 1px solid var(--brandGray10);
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: var(--brandBlack10);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--brandDarkGreen30);
  }

  .PNFInput {
    height: 32px;
    border: 1px solid var(--brandBlack70);
    border-radius: 2px;
    padding: 0px 8px;
    font-size: 14px;
    /*
    align-items: center; */
    display: none;

    @media (min-width: 530px) {
      margin-right: 40px;
      display: inline-block;
    }

    @media (min-width: 760px) {
      margin-right: 48px;
    }
  }

  .filterOptions {
    border: 1px solid blue;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    height: fit-content;

    flex-wrap: nowrap;
    display: flex;
    padding: 0px 24px;
  }

  .filterOption {
    white-space: nowrap;
    cursor: pointer;
    font-weight: 700;
    color: var(--brandGreen100);
    margin: 0 24px;

    @media (min-width: 530px) {
      margin-right: 48px;
    }

    :hover {
      color: var(--brandLightGreen100);
    }
  }

  .filterOption.activeFilter {
    text-decoration: underline;
    color: var(--brandYellow100);
  }
`

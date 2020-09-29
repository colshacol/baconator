import * as React from "react"
import styled from "styled-components"

const filters = {
  All: "available-products",
  Bacon: "bacon",
  Sausage: "sausage",
  "Hot Dogs": "hot-dogs",
  Ham: "ham",
  "Beef & Bison": "beef-bison",
  Bundles: "bundles",
}

export const BoxProductTypeFilters = (props) => {
  return (
    <BoxProductTypeFiltersContainer
      onScroll={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
    >
      <input
        className='pnf-input'
        placeholder='search product names'
        value={props.searchValue}
        onChange={props.setSearchValue}
      />
      {Object.entries(filters).map(([filter, handle]) => (
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

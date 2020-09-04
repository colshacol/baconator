import * as React from "react"
import styled from "styled-components"
import { Button } from "./Button"
import { useProductsStore } from "../stores"

const filters = [
  "Bacon",
  "Beef",
  "Turkey",
  "Ham",
  "Sausage",
  "Chorizo",
  "Bratwurst",
  "Kielbasa",
  "Hot Dogs",
]

export const BoxProductTypeFilters = (props) => {
  const productsStore = useProductsStore()

  return (
    <BoxProductTypeFiltersContainer>
      <div className='labelContainer'>
        <p className='filtersLabel'>Filter by type:</p>
      </div>
      <div className='filterOptions'>
        {filters.map((filter) => (
          <p
            key={filter}
            className={`filterOption ${
              productsStore.filter === filter ? "activeFilter" : ""
            }`}
            onClick={() => productsStore.toggleFilter(filter)}
          >
            {filter}
          </p>
        ))}
      </div>
    </BoxProductTypeFiltersContainer>
  )
}

const BoxProductTypeFiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 16px 12px;

  .labelContainer {
    width: 100%;
    font-size: 14px;
    color: var(--grayGreen);
    margin-bottom: 24px;
  }

  .filterOptions {
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    gap: 48px;
  }

  .filterOption {
    cursor: pointer;
    font-weight: 700;
    color: var(--brandGreen);

    :hover {
      color: var(--lightBrandGreen);
    }
  }

  .filterOption.activeFilter {
    text-decoration: underline;
    color: var(--darkGreen);
  }
`

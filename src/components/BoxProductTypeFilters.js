import * as React from "react"
import styled from "styled-components"
import { Button } from "./Button"
import { useProductsStore } from "../stores"

const filters = [
  "Bacon",
  "Sausage",
  "Hot Dogs",
  "Ham",
  "Beef & Bison",
  "Fresh Pork",
  "Bundles",
  // "Bacon",
  // "Beef",
  // "Turkey",
  // "Ham",
  // "Sausage",
  // "Chorizo",
  // "Bratwurst",
  // "Kielbasa",
  // "Hot Dogs",
]

export const BoxProductTypeFilters = (props) => {
  const productsStore = useProductsStore()

  return (
    <BoxProductTypeFiltersContainer>
      <div className='filterOptions useHighVoltage'>
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
  padding: 24px 0px 0px;

  .filterOptions {
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    line-height: 280%;
  }

  .filterOption {
    cursor: pointer;
    font-weight: 700;
    color: var(--brandGreen100);
    margin-right: 48px;

    :hover {
      color: var(--brandLightGreen100);
    }
  }

  .filterOption.activeFilter {
    text-decoration: underline;
    color: var(--brandYellow100);
  }
`

import React from "react"
import { Link, Route } from "wouter"
import styled from "styled-components"
import { View } from "../components/View"
import { Button } from "../components/Button"
import { BoxOption } from "../components/BoxOption"

const boxOptions = [
  {
    id: 111,
    title: "Mix & Match",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 222,
    title: "Whole30 Variety Pack",
    description:
      " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    id: 333,
    title: "Ultimate Meat Bundle",
    description:
      "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  {
    id: 444,
    title: "Fresh Pork Bundle",
    description:
      "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
  },
  {
    id: 555,
    title: "All Organic Bundle",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
]

export const BoxSelection = (props) => {
  return (
    <View>
      <View.Header data-testid='View.Header'>
        <View.Title>Select Your Box</View.Title>
        <View.Description>
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
          adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
          dolore magnam aliquam quaerat voluptatem.
        </View.Description>
      </View.Header>
      <View.Content>
        <BoxOptions>
          {boxOptions.map((option) => (
            <BoxOption key={option.id} {...option} />
          ))}
        </BoxOptions>
      </View.Content>
    </View>
  )
}

const BoxOptions = styled.div`
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
